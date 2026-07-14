import assert from "node:assert/strict"
import { describe, it } from "node:test"

import {
  normalizeListSeparators,
  renderResume,
  rewriteElegantThemeFonts,
  stripProfilePictures,
} from "./render"

describe("stripProfilePictures", () => {
  it("injects hiding CSS before the first </style>", () => {
    const html = "<style>body{}</style><body></body>"
    const out = stripProfilePictures(html)
    assert.match(out, /\.profile-pic \{ display: none/)
    // Injected before </style>, not after.
    assert.ok(out.indexOf(".profile-pic") < out.indexOf("</style>"))
  })

  it("adds a fresh <style> block when none exists", () => {
    const html = "<head><title>x</title></head><body></body>"
    const out = stripProfilePictures(html)
    assert.match(out, /<style>[\s\S]*\.profile-pic[\s\S]*<\/style><\/head>/)
  })

  it("returns input unchanged when there is neither </style> nor </head>", () => {
    const html = "<body>no head</body>"
    assert.equal(stripProfilePictures(html), html)
  })
})

describe("rewriteElegantThemeFonts", () => {
  it("rewrites single- and double-quoted fonts/ paths", () => {
    const html = `@font-face { src: url('fonts/icomoon.woff'); }
      @font-face { src: url("fonts/icomoon.ttf"); }`
    const out = rewriteElegantThemeFonts(html, "1.12.0")
    assert.match(
      out,
      /url\('https:\/\/unpkg\.com\/jsonresume-theme-elegant@1\.12\.0\/assets\/icomoon\/fonts\/icomoon\.woff'\)/,
    )
    assert.match(
      out,
      /url\("https:\/\/unpkg\.com\/jsonresume-theme-elegant@1\.12\.0\/assets\/icomoon\/fonts\/icomoon\.ttf"\)/,
    )
  })

  it("upgrades protocol-relative unpkg URLs to https", () => {
    const html = `background: url("//unpkg.com/foo/bar.png");`
    const out = rewriteElegantThemeFonts(html)
    assert.match(out, /url\("https:\/\/unpkg\.com\/foo\/bar\.png"\)/)
  })

  it("leaves unrelated URLs untouched", () => {
    const html = `<img src="https://example.com/a.png">`
    assert.equal(rewriteElegantThemeFonts(html), html)
  })
})

describe("renderResume", () => {
  it("passes resume + theme through the renderer and applies post-processors in order", async () => {
    let seen: unknown = null
    const render = async (resume: unknown, theme: unknown) => {
      seen = { resume, theme }
      return "<html>x</html>"
    }
    const out = await renderResume(
      { basics: { name: "Ada" } },
      {
        render,
        theme: "T",
        postProcess: [
          (h) => h.replace("x", "y"),
          (h) => h.replace("y", "z"),
        ],
      },
    )
    assert.equal(out, "<html>z</html>")
    assert.deepEqual(seen, {
      resume: { basics: { name: "Ada" } },
      theme: "T",
    })
  })
})

describe("normalizeListSeparators", () => {
  it("splits string highlights that contain ✌🏻", () => {
    const resume = {
      work: [{ name: "Acme", highlights: "Did X ✌🏻 Did Y ✌🏻 Did Z" }],
    }
    normalizeListSeparators(resume)
    assert.deepEqual(resume.work[0].highlights, ["Did X", "Did Y", "Did Z"])
  })

  it("expands existing array items that still contain ✌🏻", () => {
    const resume = {
      projects: [
        {
          name: "P",
          highlights: ["Alpha ✌🏻 Beta", "Gamma"],
        },
      ],
    }
    normalizeListSeparators(resume)
    assert.deepEqual(resume.projects[0].highlights, [
      "Alpha",
      "Beta",
      "Gamma",
    ])
  })

  it("normalises keywords in skills and interests", () => {
    const resume = {
      skills: [{ name: "TS", keywords: "types ✌🏻 generics" }],
      interests: [{ name: "Music", keywords: ["jazz ✌🏻 classical"] }],
    }
    normalizeListSeparators(resume)
    assert.deepEqual(resume.skills[0].keywords, ["types", "generics"])
    assert.deepEqual(resume.interests[0].keywords, ["jazz", "classical"])
  })

  it("is a no-op when no marker is present", () => {
    const resume = {
      work: [{ name: "Acme", highlights: ["Did X", "Did Y"] }],
      education: [{ institution: "Uni", courses: ["Algorithms", "Networks"] }],
    }
    const before = JSON.stringify(resume)
    normalizeListSeparators(resume)
    assert.equal(JSON.stringify(resume), before)
  })

  it("honours a custom separator regex", () => {
    const resume = {
      work: [{ name: "Acme", highlights: "Did X ||| Did Y ||| Did Z" }],
    }
    normalizeListSeparators(resume, /\|\|\|/u)
    assert.deepEqual(resume.work[0].highlights, ["Did X", "Did Y", "Did Z"])
  })

  it("leaves ✌🏻 alone when caller passes a different separator", () => {
    const resume = {
      work: [{ name: "Acme", highlights: "Did X ✌🏻 Did Y" }],
    }
    normalizeListSeparators(resume, /\|\|\|/u)
    assert.equal(resume.work[0].highlights, "Did X ✌🏻 Did Y")
  })

  it("leaves free-form fields (summary, description) untouched", () => {
    const resume = {
      basics: { summary: "Cross-team ✌🏻 copy that should NOT be split" },
      work: [{ name: "Acme", summary: "same ✌🏻 here", highlights: [] }],
      projects: [{ name: "P", description: "long ✌🏻 prose" }],
    }
    normalizeListSeparators(resume)
    assert.equal(
      resume.basics.summary,
      "Cross-team ✌🏻 copy that should NOT be split",
    )
    assert.equal(resume.work[0].summary, "same ✌🏻 here")
    assert.equal(resume.projects[0].description, "long ✌🏻 prose")
  })

  it("tolerates malformed sections without throwing", () => {
    const resume = { work: "not-an-array", skills: null }
    // Should not throw.
    normalizeListSeparators(resume as never)
    assert.equal((resume as { work: unknown }).work, "not-an-array")
  })
})
