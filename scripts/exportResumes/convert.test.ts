import { describe, it } from "node:test"
import assert from "node:assert/strict"

import { convertToJSONResume, normalizeDate, splitList } from "./convert"
import type { GraphQLResume } from "./types"

describe("normalizeDate", () => {
  it("returns undefined for empty input", () => {
    assert.equal(normalizeDate(undefined), undefined)
    assert.equal(normalizeDate(null), undefined)
    assert.equal(normalizeDate(""), undefined)
  })

  it("returns YYYY-MM-DD for valid ISO input", () => {
    assert.equal(normalizeDate("2024-01-15T00:00:00.000Z"), "2024-01-15")
    assert.equal(normalizeDate("2024-01-15"), "2024-01-15")
  })

  it("zero-pads month and day", () => {
    assert.equal(normalizeDate("2024-03-05T00:00:00.000Z"), "2024-03-05")
  })

  it("rejects unparseable strings", () => {
    const seen: string[] = []
    const result = normalizeDate("not-a-date", {
      onInvalid: (reason) => seen.push(reason),
    })
    assert.equal(result, undefined)
    assert.equal(seen.length, 1)
    assert.match(seen[0], /unparseable/)
  })

  it("rejects years out of range", () => {
    const seen: string[] = []
    const result = normalizeDate("1750-01-01", {
      onInvalid: (reason) => seen.push(reason),
    })
    assert.equal(result, undefined)
    assert.equal(seen.length, 1)
    assert.match(seen[0], /out of range/)
  })
})

describe("splitList", () => {
  it("returns undefined for empty input", () => {
    assert.equal(splitList(undefined), undefined)
    assert.equal(splitList(null), undefined)
    assert.equal(splitList("   "), undefined)
  })

  it("splits on ✌🏻 (highest priority, wins over commas)", () => {
    const input = "Did X, part one ✌🏻 Did Y, part two ✌🏻 Did Z"
    assert.deepEqual(splitList(input), [
      "Did X, part one",
      "Did Y, part two",
      "Did Z",
    ])
  })

  it("honours a caller-supplied separator regex", () => {
    const re = /\|\|\|/u
    assert.deepEqual(splitList("a ||| b ||| c", re), ["a", "b", "c"])
    // Default separator should be ignored when a custom one is passed.
    assert.deepEqual(splitList("a ✌🏻 b", re), ["a ✌🏻 b"])
  })

  it("splits on ✌ (bare victory-hand, no skin-tone)", () => {
    assert.deepEqual(splitList("a ✌ b ✌ c"), ["a", "b", "c"])
  })

  it("splits on ✌ with other skin-tone modifiers", () => {
    assert.deepEqual(splitList("a ✌🏿 b"), ["a", "b"])
  })

  it("splits on newlines when no ✌🏻 is present", () => {
    assert.deepEqual(splitList("a\nb\nc"), ["a", "b", "c"])
    assert.deepEqual(splitList("a\r\nb"), ["a", "b"])
  })

  it("falls back to commas / semicolons", () => {
    assert.deepEqual(splitList("react, next, node"), ["react", "next", "node"])
    assert.deepEqual(splitList("a; b; c"), ["a", "b", "c"])
  })

  it("returns single-element array for a single token", () => {
    assert.deepEqual(splitList("solo"), ["solo"])
  })

  it("strips blank entries and trims whitespace", () => {
    assert.deepEqual(splitList(" a , , b , "), ["a", "b"])
  })
})

describe("convertToJSONResume", () => {
  const baseResume: GraphQLResume = {
    id: "r1",
    title: "Test",
    language: { id: "l1", value: "en-US", label: "English" },
  }

  it("returns an empty object for a nearly-empty resume", () => {
    assert.deepEqual(convertToJSONResume(baseResume), {})
  })

  it("converts basic information and drops empty fields", () => {
    const result = convertToJSONResume({
      ...baseResume,
      basicInformation: {
        name: "Ada Lovelace",
        email: "ada@example.com",
        label: "",
        phone: null,
        image: { src: "https://cdn/pic.png" },
        location: { city: "London", region: "" },
        profiles: [
          { network: "GitHub", username: "ada", url: "https://gh/ada" },
          { network: "", username: "", url: "" },
        ],
      },
    })
    assert.deepEqual(result.basics, {
      name: "Ada Lovelace",
      email: "ada@example.com",
      image: "https://cdn/pic.png",
      location: { city: "London" },
      profiles: [{ network: "GitHub", username: "ada", url: "https://gh/ada" }],
    })
  })

  it("normalises work dates and preserves highlight values", () => {
    const result = convertToJSONResume({
      ...baseResume,
      work: [
        {
          name: "Acme",
          position: "Engineer",
          startDate: "2020-01-01T00:00:00.000Z",
          endDate: "2022-06-15T00:00:00.000Z",
          highlights: [
            { value: "Shipped X" },
            { value: "" },
            { value: "Shipped Y" },
          ],
        },
      ],
    })
    assert.deepEqual(result.work, [
      {
        name: "Acme",
        position: "Engineer",
        startDate: "2020-01-01",
        endDate: "2022-06-15",
        highlights: ["Shipped X", "Shipped Y"],
      },
    ])
  })

  it("splits string highlights/courses/keywords into arrays", () => {
    const result = convertToJSONResume({
      ...baseResume,
      volunteer: [
        {
          organization: "Org",
          highlights: "Led team\nOrganised event",
        },
      ],
      education: [
        {
          institution: "Uni",
          courses: "Algorithms, Networks, Databases",
        },
      ],
      skills: [{ name: "TypeScript", keywords: "types, generics" }],
      interests: [{ name: "Music", keywords: "jazz\nclassical" }],
      projects: [
        {
          name: "P",
          highlights: "One\nTwo",
        },
      ],
    })
    assert.deepEqual(result.volunteer?.[0].highlights, [
      "Led team",
      "Organised event",
    ])
    assert.deepEqual(result.education?.[0].courses, [
      "Algorithms",
      "Networks",
      "Databases",
    ])
    assert.deepEqual(result.skills?.[0].keywords, ["types", "generics"])
    assert.deepEqual(result.interests?.[0].keywords, ["jazz", "classical"])
    assert.deepEqual(result.projects?.[0].highlights, ["One", "Two"])
  })

  it("carries award url through and omits missing fields", () => {
    const result = convertToJSONResume({
      ...baseResume,
      awards: [
        {
          title: "Best Speaker",
          url: "https://example.com/award",
          awarder: "ConfX",
        },
      ],
    })
    assert.deepEqual(result.awards, [
      {
        title: "Best Speaker",
        url: "https://example.com/award",
        awarder: "ConfX",
      },
    ])
  })

  it("maps certificates to name/url/summary only (no undefined placeholders)", () => {
    const result = convertToJSONResume({
      ...baseResume,
      certificates: [
        {
          title: "AWS SAA",
          link: "https://verify/aws",
          description: "Cert desc",
        },
      ],
    })
    assert.deepEqual(result.certificates, [
      { name: "AWS SAA", url: "https://verify/aws", summary: "Cert desc" },
    ])
    // Ensure no lingering `date` / `issuer: undefined` keys.
    const cert = result.certificates?.[0] as Record<string, unknown>
    assert.equal("date" in cert, false)
    assert.equal("issuer" in cert, false)
  })
})
