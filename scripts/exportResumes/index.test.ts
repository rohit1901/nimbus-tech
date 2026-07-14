import { describe, it } from "node:test"
import assert from "node:assert/strict"

import {
  renderFilename,
  slugifyName,
  uniqueFilename,
} from "./index"

describe("slugifyName", () => {
  it("lowercases and joins on underscore", () => {
    assert.equal(slugifyName("Ada Lovelace"), "ada_lovelace")
  })

  it("preserves non-Latin letters", () => {
    assert.equal(slugifyName("李明"), "李明")
    assert.equal(slugifyName("Jörg Müller"), "jörg_müller")
  })

  it("strips punctuation but keeps hyphens", () => {
    assert.equal(slugifyName("O'Brien-Smith, Jr."), "obrien-smith_jr")
  })

  it("returns empty string for whitespace input", () => {
    assert.equal(slugifyName("   "), "")
  })
})

describe("renderFilename", () => {
  it("substitutes all placeholders", () => {
    assert.equal(
      renderFilename("{name}_{lang}_resume.{ext}", {
        name: "ada",
        lang: "en-US",
        id: "abc",
        ext: "json",
      }),
      "ada_en-US_resume.json",
    )
  })

  it("supports {id} placeholder", () => {
    assert.equal(
      renderFilename("{id}-{lang}.{ext}", {
        name: "n",
        lang: "de",
        id: "xyz",
        ext: "json",
      }),
      "xyz-de.json",
    )
  })
})

describe("uniqueFilename", () => {
  it("returns the desired name when unclaimed", () => {
    const set = new Set<string>()
    assert.equal(uniqueFilename("a_en_resume.json", set, "id1"), "a_en_resume.json")
  })

  it("appends a short id on first collision", () => {
    const set = new Set(["a_en_resume.json"])
    assert.equal(
      uniqueFilename("a_en_resume.json", set, "clr12345xyz"),
      "a_en_resume-clr12345.json",
    )
  })

  it("appends -N on subsequent collisions", () => {
    const set = new Set([
      "a_en_resume.json",
      "a_en_resume-clr12345.json",
    ])
    assert.equal(
      uniqueFilename("a_en_resume.json", set, "clr12345xyz"),
      "a_en_resume-clr12345-2.json",
    )
  })
})
