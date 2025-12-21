const fs = require('fs');

const content = `
# Database credentials
DATABASE_URL="postgres://postgres.wspguyeoeekhuwrbrsqq:Carapuce%3F18@db.wspguyeoeekhuwrbrsqq.supabase.co:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.wspguyeoeekhuwrbrsqq:Carapuce%3F18@db.wspguyeoeekhuwrbrsqq.supabase.co:5432/postgres"
`;

try {
  fs.appendFileSync('.env', content);
  console.log('Successfully appended credentials to .env');
} catch (err) {
  console.error('Error appending to .env:', err);
  process.exit(1);
}
