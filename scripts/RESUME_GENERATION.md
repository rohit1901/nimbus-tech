# Resume Generation with Resumed

Complete guide for generating beautiful HTML resumes using resumed and JSON Resume themes.

## 🚀 Quick Start

```bash
# Step 1: Export resumes from GraphQL
npm run export:resumes

# Step 2: Generate HTML files
npm run generate:resume-files

# Done! Open the files in output/resume-files/
```

## 📋 Overview

This project uses:
- **resumed** - Professional resume renderer
- **JSON Resume** - Standard resume schema
- **jsonresume-theme-elegant** - Default professional theme

## 📂 Output Structure

```
output/
├── resumes/                          # JSON Resume files
│   ├── rohit_khanduri_en-US_resume.json
│   └── rohit_khanduri_de-DE_resume.json
└── resume-files/                     # HTML resume files
    ├── en-US/
    │   └── rohit_khanduri.html
    └── de-DE/
        └── rohit_khanduri.html
```

## 🎨 Using Different Themes

### Install Additional Themes

```bash
# Clean and modern
npm install --save-dev jsonresume-theme-even

# Tech-focused
npm install --save-dev jsonresume-theme-stackoverflow

# Minimalist
npm install --save-dev jsonresume-theme-kendall

# Compact
npm install --save-dev jsonresume-theme-short

# Browse more: https://jsonresume.org/themes/
```

### Use a Theme

```bash
# Use specific theme
node scripts/generateResumeFiles.ts --theme=even

# Or with npm
npm run generate:resume-files -- --theme=stackoverflow
```

### Compare Themes

```bash
# Generate with multiple themes
node scripts/generateResumeFiles.ts --theme=elegant --output=output/elegant
node scripts/generateResumeFiles.ts --theme=even --output=output/even
node scripts/generateResumeFiles.ts --theme=stackoverflow --output=output/stackoverflow

# Compare and choose your favorite!
```

## 📄 Converting to PDF

### Option 1: Browser Print (Recommended)

```bash
# Open HTML file
open output/resume-files/en-US/rohit_khanduri.html

# Use browser: File → Print → Save as PDF
```

### Option 2: wkhtmltopdf

```bash
# Install
brew install wkhtmltopdf  # macOS
apt-get install wkhtmltopdf  # Ubuntu/Debian

# Convert
wkhtmltopdf \
  output/resume-files/en-US/rohit_khanduri.html \
  output/resume-files/en-US/rohit_khanduri.pdf
```

### Option 3: Puppeteer

```bash
npm install puppeteer

node -e "
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file://${PWD}/output/resume-files/en-US/rohit_khanduri.html', { 
    waitUntil: 'networkidle0' 
  });
  await page.pdf({ 
    path: 'resume.pdf', 
    format: 'A4',
    printBackground: true 
  });
  await browser.close();
})();
"
```

## ⚙️ Configuration

### Default Settings

- **Theme:** `jsonresume-theme-elegant`
- **Input:** `output/resumes/`
- **Output:** `output/resume-files/`

### Custom Settings

```bash
# Custom input directory
node scripts/generateResumeFiles.ts --input=custom/resumes

# Custom output directory
node scripts/generateResumeFiles.ts --output=custom/output

# Custom theme
node scripts/generateResumeFiles.ts --theme=kendall

# Combine options
node scripts/generateResumeFiles.ts \
  --theme=even \
  --input=custom/resumes \
  --output=custom/output
```

## 🌍 Multi-Language Support

The script automatically:
- Detects language from filenames (`{name}_{language}_resume.json`)
- Creates language-specific directories (`en-US/`, `de-DE/`)
- Organizes output for easy distribution

Example:
```
rohit_khanduri_en-US_resume.json → output/resume-files/en-US/rohit_khanduri.html
rohit_khanduri_de-DE_resume.json → output/resume-files/de-DE/rohit_khanduri.html
```

## ✅ Features

- ✅ **Professional Themes** - 50+ community designs
- ✅ **Responsive** - Mobile-friendly layouts
- ✅ **Print-Optimized** - Perfect for PDFs
- ✅ **Standards Compliant** - JSON Resume schema
- ✅ **Easy Theme Switching** - One command
- ✅ **Multi-Language** - Auto-organized
- ✅ **No Lock-in** - Standard format

## 🔧 Troubleshooting

### No resumes found

```
⚠️ No resume files found
```

**Solution:** Run `npm run export:resumes` first

### Theme not found

```
❌ Theme not found: jsonresume-theme-elegant
```

**Solution:** Install the theme: `npm install --save-dev jsonresume-theme-elegant`

### GraphQL connection error

For exporting resumes, ensure:
- GraphQL API is running
- `NEXT_PUBLIC_GRAPHQL_URL` is set in `.env`
- `NEXT_PUBLIC_USE_MOCK=false` in `.env`

## 📚 Documentation

- **Scripts README:** `scripts/README.md` - Detailed documentation for all scripts
- **Export Resumes:** `scripts/exportResumes.ts` - Export implementation
- **Generate Files:** `scripts/generateResumeFiles.ts` - HTML generation
- **JSON Resume:** https://jsonresume.org/schema - Official schema
- **Themes:** https://jsonresume.org/themes/ - Browse available themes
- **Resumed:** https://github.com/rbardini/resumed - Renderer documentation

## 💡 Tips

1. **Theme Selection:** Try multiple themes and choose your favorite
2. **PDF Quality:** Browser print usually gives best results
3. **Customization:** Each theme has its own style and layout
4. **Updates:** Re-run after GraphQL data changes
5. **Version Control:** Consider committing generated files for backup

## 🎯 Complete Workflow

```bash
# 1. Export from GraphQL
npm run export:resumes
# → Creates JSON files in output/resumes/

# 2. Generate HTML
npm run generate:resume-files
# → Creates HTML files in output/resume-files/

# 3. View in browser
open output/resume-files/en-US/rohit_khanduri.html

# 4. Print to PDF
# Use browser's Print → Save as PDF

# 5. Distribute
# Share HTML or PDF files as needed
```

## 📦 Dependencies

All resume-related dependencies are in `devDependencies`:

- **resumed** (^6.1.0) - Resume renderer
- **jsonresume-theme-elegant** (^1.16.1) - Default theme

Install with: `npm install`

## 🌟 What Gets Exported

All JSON Resume sections are included:

- ✅ **Basics** - Name, email, phone, location, profiles, summary
- ✅ **Work Experience** - Positions, companies, dates, highlights
- ✅ **Projects** - Descriptions, technologies, achievements
- ✅ **Education** - Degrees, institutions, courses
- ✅ **Skills** - Technologies, proficiency levels, keywords
- ✅ **Volunteer** - Community contributions
- ✅ **Awards & Certificates** - Recognition and credentials
- ✅ **Publications** - Articles and papers
- ✅ **Languages** - Spoken languages and fluency
- ✅ **Interests** - Hobbies and areas of interest
- ✅ **References** - Professional references

---

**Generated resumes are professional, responsive, and ready to use!** 🎉

For more details, see `scripts/README.md` for comprehensive documentation on all available scripts.