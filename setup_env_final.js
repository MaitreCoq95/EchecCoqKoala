const fs = require('fs');

const password = 'Carapuce%3F18';
// User provided host: aws-1-eu-north-1.pooler.supabase.com
const host = 'aws-1-eu-north-1.pooler.supabase.com';
const dbName = 'postgres';
const user = 'postgres.wspguyeoeekhuwrbrsqq';

// Transaction Pooler (Port 6543) - Best for Serverless/Next.js
const dbUrl = `postgres://${user}:${password}@${host}:6543/${dbName}?pgbouncer=true`;

// Session Pooler / Direct (Port 5432) - Required for Migrations
const directUrl = `postgresql://${user}:${password}@${host}:5432/${dbName}`;

const content = `
# Database credentials (IPv4 Pooler)
DATABASE_URL="${dbUrl}"
DIRECT_URL="${directUrl}"

# Public Supabase Keys (Preserved)
NEXT_PUBLIC_SUPABASE_URL="https://wspguyeoeekhuwrbrsqq.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzcGd1eWVvZWVraHV3cmJyc3FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3MDI2NjQsImV4cCI6MjA1MDI3ODY2NH0.MvJ-wFVTiIfcRfC0zYwfWrqBUYP2n3D1o3wG3qE0zYw"
`;

try {
  fs.writeFileSync('.env', content);
  fs.writeFileSync('.env.local', content); // Sync both for consistency
  console.log('Successfully updated .env and .env.local with IPv4 Pooler URLs');
} catch (err) {
  console.error('Error writing .env:', err);
  process.exit(1);
}
