#!/usr/bin/env tsx

/**
 * @fileoverview Development Setup Script
 *
 * Runs all necessary setup and file generation for local development.
 * Handles failures gracefully - continues even if some steps fail.
 *
 * ⚠️  IMPORTANT: This script does NOT run automatically after npm install.
 *     You must run it manually for first-time setup and when regenerating files.
 *
 * Usage:
 *   npm run setup:dev              # Recommended
 *   or
 *   npx tsx scripts/setupDev.ts    # Direct execution
 *
 * When to run:
 *   - After npm install (first-time setup)
 *   - When GraphQL schema changes
 *   - After pulling changes that affect generated files
 *   - To regenerate all files after API updates
 */

import { execSync } from 'child_process';
import { existsSync, copyFileSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

interface SetupStep {
  name: string;
  description: string;
  command?: string;
  fn?: () => void;
  required: boolean; // If true, exit on failure. If false, continue.
  requiresGraphQL?: boolean; // Needs GraphQL API running
}

const STEPS: SetupStep[] = [
  {
    name: 'Environment Setup',
    description: 'Copy environment template',
    fn: () => {
      const source = join(process.cwd(), '.env.copy');
      const target = join(process.cwd(), '.env');

      if (!existsSync(source)) {
        throw new Error('.env.copy not found');
      }

      if (existsSync(target)) {
        console.log('   ℹ️  .env already exists, skipping');
        return;
      }

      copyFileSync(source, target);
      console.log('   ✓ Created .env from .env.copy');
    },
    required: false,
  },
  {
    name: 'GraphQL Types',
    description: 'Generate GraphQL types',
    command: 'npm run graphql:generate',
    required: false,
    requiresGraphQL: true,
  },
  {
    name: 'Icon Map',
    description: 'Generate icon map from @remixicon/react',
    command: 'npm run icons:generate',
    required: false,
  },
  {
    name: 'Page Content Files',
    description: 'Generate page content fallback files',
    command: 'npm run generate:page-files',
    required: false,
    requiresGraphQL: true,
  },
  {
    name: 'Resume Export',
    description: 'Export resumes to JSON Resume format',
    command: 'npm run export:resumes',
    required: false,
    requiresGraphQL: true,
  },
  {
    name: 'Resume Files',
    description: 'Generate HTML resume files',
    command: 'npm run generate:resume-files',
    required: false,
    requiresGraphQL: false, // Depends on export:resumes but not directly on GraphQL
  },
];

/**
 * Check if GraphQL API is accessible
 */
async function checkGraphQLAPI(): Promise<boolean> {
  const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL;
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

  if (!graphqlUrl || useMock) {
    return false;
  }

  try {
    const response = await fetch(graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ __typename }' }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Execute a setup step
 */
function executeStep(step: SetupStep): boolean {
  try {
    if (step.fn) {
      step.fn();
    } else if (step.command) {
      execSync(step.command, { stdio: 'inherit' });
    }
    return true;
  } catch (error) {
    console.error(`   ✗ Failed: ${error instanceof Error ? error.message : error}`);
    return false;
  }
}

/**
 * Main setup function
 */
async function main() {
  console.log('🚀 Starting development setup...\n');

  // Check GraphQL availability
  console.log('🔍 Checking GraphQL API availability...');
  const hasGraphQL = await checkGraphQLAPI();

  if (hasGraphQL) {
    console.log('   ✓ GraphQL API is accessible');
  } else {
    console.log('   ⚠️  GraphQL API not accessible');
    console.log('   ℹ️  Steps requiring GraphQL will be skipped');
  }
  console.log('');

  let successCount = 0;
  let skipCount = 0;
  let failCount = 0;

  for (const step of STEPS) {
    console.log(`📦 ${step.name}`);
    console.log(`   ${step.description}`);

    // Skip GraphQL-dependent steps if API not available
    if (step.requiresGraphQL && !hasGraphQL) {
      console.log('   ⏭️  Skipped (requires GraphQL API)');
      skipCount++;
      console.log('');
      continue;
    }

    const success = executeStep(step);

    if (success) {
      console.log('   ✅ Complete');
      successCount++;
    } else {
      failCount++;
      if (step.required) {
        console.log('\n❌ Required step failed. Exiting...');
        process.exit(1);
      } else {
        console.log('   ⚠️  Failed but continuing...');
      }
    }

    console.log('');
  }

  // Summary
  console.log('='.repeat(60));
  console.log('📊 Setup Summary:');
  console.log(`   ✅ Completed: ${successCount}`);
  console.log(`   ⏭️  Skipped: ${skipCount}`);
  console.log(`   ⚠️  Failed: ${failCount}`);
  console.log('='.repeat(60));

  if (failCount === 0 && skipCount === 0) {
    console.log('\n✨ All setup steps completed successfully!');
    console.log('\n💡 You can now run: npm run dev');
  } else if (skipCount > 0) {
    console.log('\n⚠️  Some steps were skipped (GraphQL API not available)');
    console.log('\n💡 To generate all files:');
    console.log('   1. Ensure GraphQL API is running');
    console.log('   2. Set NEXT_PUBLIC_GRAPHQL_URL in .env');
    console.log('   3. Run: npm run setup:dev');
    console.log('\n   Or generate files individually:');
    console.log('   - npm run generate:page-files');
    console.log('   - npm run export:resumes');
    console.log('   - npm run generate:resume-files');
  } else if (failCount > 0) {
    console.log('\n⚠️  Some optional steps failed but setup can continue');
    console.log('\n💡 You can still run: npm run dev');
    console.log('   Fix errors and re-run: npm run setup:dev');
  }

  console.log('');
}

// Run the script
main().catch((error) => {
  console.error('\n💥 Fatal error:', error);
  process.exit(1);
});
