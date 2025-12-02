# Remixicon Map Generator

## Setup
npm install @remixicon/react
npm install -D tsx typescript

text

## Generate Icon Map
npm run icons:generate

text

**Output**: `src/icons/remixicon-map.ts` with all ~2,500 Remixicons mapped.

## Usage
import { remixIconMap, RemixiconComponentType } from '@/icons/remixicon-map';

type HeroType = {
banner: {
icon?: RemixiconComponentType;
}
};

// Dynamic lookup
const iconName = "Ri24HoursFill";
const Icon = remixIconMap[iconName]; // Fully typed!
<Icon size={24} />;

text

## Workflow
- **First run**: `npm run icons:generate`
- **@remixicon/react updates**: Re-run `npm run icons:generate`
- **Auto-generate**: Runs on `npm install` via `postinstall`

## Tree-shaking
✅ Map uses named imports, fully tree-shakable
✅ Only used icons bundled (~1KB per icon)

**Regenerate anytime** - script validates dependencies and handles all edge cases.
