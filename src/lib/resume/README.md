# Resume Library Module

This directory contains utility functions for working with resume data in the Nimbus Tech application.

## Overview

The resume library provides conversion utilities between GraphQL Resume schema and the standardized JSON Resume format, enabling export, sharing, and use with the broader JSON Resume ecosystem.

## Files

- `resumeConverter.ts` - Core conversion and export utilities

## Module Location

This module was moved from `src/utils/resumeConverter.ts` to `src/lib/resume/resumeConverter.ts` to better organize library-specific functionality. The `src/lib` directory contains specialized modules (like `legal`, `resume`) while `src/utils` is reserved for general-purpose utilities.

## Usage

### In React Components

```typescript
import { useResumes } from '@/queries/index';
import { 
  convertToJSONResume, 
  downloadJSONResume,
  validateJSONResume 
} from '@/lib/resume/resumeConverter';

function ResumeExportButton() {
  const { data } = useResumes();
  
  const handleExport = () => {
    if (data?.resumes?.[0]) {
      const resume = data.resumes[0];
      
      // Validate before export
      const validation = validateJSONResume(resume);
      if (!validation.isValid) {
        console.warn('Missing required fields:', validation.missingFields);
      }
      
      // Convert and download
      const jsonResume = convertToJSONResume(resume);
      downloadJSONResume(jsonResume, 'resume.json');
    }
  };
  
  return <button onClick={handleExport}>Export Resume</button>;
}
```

### In Server-Side Scripts

See `scripts/exportResumes.ts` for an example of using the conversion logic in Node.js scripts.

## API Reference

### `convertToJSONResume(resume: Resume): JSONResumeSchema`

Converts a GraphQL Resume object to JSON Resume format.

**Parameters:**
- `resume` - Resume object from GraphQL query

**Returns:**
- JSON Resume formatted object

**Example:**
```typescript
const jsonResume = convertToJSONResume(graphqlResume);
```

### `convertResumesToJSONResume(resumes: Resume[]): JSONResumeSchema[]`

Converts multiple resumes at once.

**Parameters:**
- `resumes` - Array of Resume objects

**Returns:**
- Array of JSON Resume formatted objects

### `downloadJSONResume(jsonResume: JSONResumeSchema, filename?: string): void`

Downloads a JSON Resume as a file (browser only).

**Parameters:**
- `jsonResume` - The JSON Resume object
- `filename` - Optional filename (defaults to 'resume.json')

**Example:**
```typescript
downloadJSONResume(jsonResume, 'my-resume.json');
```

### `validateJSONResume(resume: Resume): ValidationResult`

Validates if a resume has required fields for JSON Resume format.

**Parameters:**
- `resume` - Resume object to validate

**Returns:**
```typescript
{
  isValid: boolean;
  missingFields: string[];
  warnings: string[];
}
```

**Example:**
```typescript
const validation = validateJSONResume(resume);
if (!validation.isValid) {
  console.error('Missing required fields:', validation.missingFields);
}
if (validation.warnings.length > 0) {
  console.warn('Recommended fields missing:', validation.warnings);
}
```

## JSON Resume Schema

The JSON Resume schema includes:

- **basics** - Name, contact info, summary, location, profiles
- **work** - Work experience with highlights
- **volunteer** - Volunteer experience
- **education** - Educational background
- **awards** - Awards and recognition
- **certificates** - Professional certificates
- **publications** - Published works
- **skills** - Technical and soft skills
- **languages** - Spoken languages and fluency
- **interests** - Personal interests
- **references** - Professional references
- **projects** - Notable projects

For the complete schema specification, see https://jsonresume.org/schema

## Migration Notes

If you have existing imports from the old location:

```typescript
// Old import (deprecated)
import { convertToJSONResume } from '@/utils/resumeConverter';

// New import (current)
import { convertToJSONResume } from '@/lib/resume/resumeConverter';
```

The module functionality remains unchanged; only the location has been updated.

## Related Documentation

- **Export Script:** `scripts/exportResumes.ts` - Server-side resume export
- **Scripts Documentation:** `scripts/README.md` - Complete scripts reference
- **Resume Generation:** `scripts/RESUME_GENERATION.md` - Resume generation guide
- **JSON Resume Standard:** https://jsonresume.org/schema - Official specification

## Testing

When working with resume data:

1. Always validate before exporting
2. Check for required fields (name, email recommended)
3. Test with different languages
4. Verify date formats are ISO 8601 compliant
5. Ensure URLs are properly formatted

## Support

For issues or questions related to resume conversion:

1. Check the validation results for missing fields
2. Verify GraphQL query includes all necessary fields
3. Consult JSON Resume schema documentation
4. Review example scripts in `scripts/` directory