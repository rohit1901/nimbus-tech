import assert from "node:assert/strict"
import { mkdtemp, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { describe, it } from "node:test"

import {
  discoverResumeFiles,
  filterResumeFiles,
  parseFilename,
  resolveExplicitFiles,
} from "./discover"

describe("parseFilename", () => {
  it("parses the default template", () => {
    const r = parseFilename("/x/rohit_khanduri_en-US_resume.json")
    assert.equal(r.name, "rohit_khanduri")
    assert.equal(r.language, "en-US")
    assert.equal(r.basename, "rohit_khanduri_en-US_resume")
  })

  it("handles multi-word names with underscores", () => {
    const r = parseFilename("/x/mary_ann_de_la_cruz_de-DE_resume.json")
    assert.equal(r.name, "mary_ann_de_la_cruz")
    assert.equal(r.language, "de-DE")
  })

  it('falls back to language "unknown" when no code is present', () => {
    const r = parseFilename("/x/single.json")
    assert.equal(r.language, "unknown")
    assert.equal(r.name, "single")
  })

  it("keeps trailing segment as part of the name if it is not a language code", () => {
    const r = parseFilename("/x/rohit_engineering_resume.json")
    assert.equal(r.language, "unknown")
    assert.equal(r.name, "rohit_engineering")
  })
})

describe("filterResumeFiles", () => {
  const files = [
    {
      path: "/a",
      basename: "a_en-US_resume",
      name: "ada",
      language: "en-US",
    },
    {
      path: "/b",
      basename: "b_de-DE_resume",
      name: "bob",
      language: "de-DE",
    },
    {
      path: "/c",
      basename: "c_en-US_resume",
      name: "carol_ada",
      language: "en-US",
    },
  ]

  it("returns all files when no filters supplied", () => {
    assert.equal(filterResumeFiles(files, { languages: [] }).length, 3)
  })

  it("filters by language (case-insensitive)", () => {
    const r = filterResumeFiles(files, { languages: ["EN-us"] })
    assert.deepEqual(
      r.map((x) => x.name),
      ["ada", "carol_ada"],
    )
  })

  it("filters by name substring", () => {
    const r = filterResumeFiles(files, { languages: [], name: "ada" })
    assert.deepEqual(
      r.map((x) => x.name),
      ["ada", "carol_ada"],
    )
  })

  it("combines filters with AND semantics", () => {
    const r = filterResumeFiles(files, {
      languages: ["de-DE"],
      name: "ada",
    })
    assert.deepEqual(r, [])
  })
})

describe("discoverResumeFiles", () => {
  it("lists .json files sorted by basename", async () => {
    const dir = await mkdtemp(join(tmpdir(), "grf-"))
    await writeFile(join(dir, "b_en_resume.json"), "{}")
    await writeFile(join(dir, "a_en_resume.json"), "{}")
    await writeFile(join(dir, "c_en_resume.txt"), "ignored")

    const files = await discoverResumeFiles({ inputDir: dir })
    assert.deepEqual(
      files.map((f) => f.basename),
      ["a_en_resume", "b_en_resume"],
    )
  })

  it("throws a helpful error when the directory is missing", async () => {
    await assert.rejects(
      () => discoverResumeFiles({ inputDir: "/does/not/exist/xyz" }),
      /Run "npm run export:resumes" first, or pass --file/,
    )
  })

  it("suggests --file when --input points at a regular file", async () => {
    const dir = await mkdtemp(join(tmpdir(), "grf-notdir-"))
    const filePath = join(dir, "resume.json")
    await writeFile(filePath, "{}")
    await assert.rejects(
      () => discoverResumeFiles({ inputDir: filePath }),
      /is not a directory[\s\S]*use --file/,
    )
  })
})

describe("resolveExplicitFiles", () => {
  it("resolves absolute and relative paths against cwd", async () => {
    const dir = await mkdtemp(join(tmpdir(), "grf-file-"))
    const absolute = join(dir, "ada_en-US_resume.json")
    await writeFile(absolute, "{}")

    const files = await resolveExplicitFiles(
      [absolute, "ada_en-US_resume.json"],
      { cwd: dir },
    )
    assert.equal(files.length, 2)
    assert.equal(files[0].path, absolute)
    assert.equal(files[1].path, absolute)
    assert.equal(files[0].name, "ada")
    assert.equal(files[0].language, "en-US")
  })

  it("still derives name/language via parseFilename for custom files", async () => {
    const dir = await mkdtemp(join(tmpdir(), "grf-file-"))
    const p = join(dir, "my_custom_resume.json")
    await writeFile(p, "{}")

    const [file] = await resolveExplicitFiles([p])
    // Trailing segment "custom" isn't a language code, so it stays in
    // the name and language falls back to "unknown".
    assert.equal(file.name, "my_custom")
    assert.equal(file.language, "unknown")
  })

  it("throws a helpful error for a missing --file path", async () => {
    await assert.rejects(
      () => resolveExplicitFiles(["/does/not/exist/nope.json"]),
      /--file not found:/,
    )
  })

  it("throws when the path is a directory", async () => {
    const dir = await mkdtemp(join(tmpdir(), "grf-file-"))
    await assert.rejects(
      () => resolveExplicitFiles([dir]),
      /--file is not a regular file/,
    )
  })
})
