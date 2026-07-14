import assert from "node:assert/strict"
import { describe, it } from "node:test"

import {
  DEFAULT_LIST_SEPARATOR,
  DEFAULT_LIST_SEPARATOR_RE,
  pickListSeparator,
  resolveSeparatorRegex,
} from "./listSeparator"

describe("DEFAULT_LIST_SEPARATOR_RE", () => {
  it("matches ✌🏻 (light skin tone, default)", () => {
    assert.match("a ✌🏻 b", DEFAULT_LIST_SEPARATOR_RE)
  })

  it("matches bare ✌ (no modifier)", () => {
    assert.match("a ✌ b", DEFAULT_LIST_SEPARATOR_RE)
  })

  it("matches other skin tones (✌🏿)", () => {
    assert.match("a ✌🏿 b", DEFAULT_LIST_SEPARATOR_RE)
  })

  it("does not match unrelated characters", () => {
    assert.doesNotMatch("hello world", DEFAULT_LIST_SEPARATOR_RE)
  })

  it("the default constant is literally ✌🏻", () => {
    assert.equal(DEFAULT_LIST_SEPARATOR, "✌🏻")
  })
})

describe("resolveSeparatorRegex", () => {
  it("returns the default regex when override is null / undefined", () => {
    assert.equal(resolveSeparatorRegex(undefined), DEFAULT_LIST_SEPARATOR_RE)
    assert.equal(resolveSeparatorRegex(null), DEFAULT_LIST_SEPARATOR_RE)
  })

  it("throws when override is an empty string", () => {
    assert.throws(() => resolveSeparatorRegex(""), /cannot be an empty string/)
  })

  it("builds a literal-match regex from a plain string", () => {
    const re = resolveSeparatorRegex("|||")
    assert.deepEqual("a ||| b ||| c".split(re), ["a ", " b ", " c"])
  })

  it("escapes regex metacharacters in the override", () => {
    const re = resolveSeparatorRegex(".*")
    // Should NOT be treated as `any char` — must be literal ".*"
    assert.deepEqual("hello.*world".split(re), ["hello", "world"])
    assert.deepEqual("hello".split(re), ["hello"])
  })

  it("supports multi-codepoint overrides (emoji)", () => {
    const re = resolveSeparatorRegex("🔸")
    assert.deepEqual("a 🔸 b 🔸 c".split(re), ["a ", " b ", " c"])
  })
})

describe("pickListSeparator", () => {
  it("prefers the CLI value over env", () => {
    assert.equal(
      pickListSeparator("cli", { RESUME_LIST_SEPARATOR: "env" }),
      "cli",
    )
  })

  it("falls back to the env var when CLI is undefined", () => {
    assert.equal(
      pickListSeparator(undefined, { RESUME_LIST_SEPARATOR: "envval" }),
      "envval",
    )
  })

  it("returns undefined when neither is set", () => {
    assert.equal(pickListSeparator(undefined, {}), undefined)
  })

  it("treats an empty env var as not set", () => {
    assert.equal(pickListSeparator(undefined, { RESUME_LIST_SEPARATOR: "" }), undefined)
  })

  it("treats an empty CLI value as explicitly empty (kept, then rejected downstream)", () => {
    // An explicit --list-separator="" should propagate so `resolveSeparatorRegex`
    // can throw with a clear error rather than silently falling back.
    assert.equal(pickListSeparator("", { RESUME_LIST_SEPARATOR: "env" }), "")
  })
})
