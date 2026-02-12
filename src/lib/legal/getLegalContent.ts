import { readFileSync } from 'fs'
import { join } from 'path'

export type LegalDocument = 'privacy' | 'terms'
export type Language = 'en-US' | 'de-DE'

const LEGAL_FILE_MAP: Record<LegalDocument, Record<Language, string>> = {
  privacy: {
    'en-US': 'datenschutz-en.md',
    'de-DE': 'datenschutz-de.md',
  },
  terms: {
    'en-US': 'terms-en.md',
    'de-DE': 'agb-de.md',
  },
}

export function getLegalContent(document: LegalDocument, language: Language): string {
  const filename = LEGAL_FILE_MAP[document][language]
  const filePath = join(process.cwd(), 'src', 'data', 'legal', filename)

  try {
    const content = readFileSync(filePath, 'utf-8')
    return content
  } catch (error) {
    console.error(`Error reading legal file: ${filename}`, error)
    // Fallback to English if German file doesn't exist
    if (language === 'de-DE') {
      const englishFilename = LEGAL_FILE_MAP[document]['en-US']
      const englishFilePath = join(process.cwd(), 'src', 'data', 'legal', englishFilename)
      return readFileSync(englishFilePath, 'utf-8')
    }
    throw error
  }
}
