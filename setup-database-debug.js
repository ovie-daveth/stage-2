/**
 * Debug script to check .env loading
 */

require('dotenv').config();

console.log('Environment Variables:');
console.log('DATABASE_URL:', process.env.DATABASE_URL || 'NOT SET');

console.log('\nChecking .env file:');
const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath)) {
  console.log('✓ .env file exists');
  const content = fs.readFileSync(envPath, 'utf8');
  console.log('\nFirst few lines:');
  console.log(content.split('\n').slice(0, 5).join('\n'));
} else {
  console.log('✗ .env file does NOT exist');
  console.log('Looking for:', envPath);
}

