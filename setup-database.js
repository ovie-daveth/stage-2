/**
 * Database Setup Script
 * Run with: node setup-database.js
 */

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
  let connection;
  
  try {
    console.log('📦 Starting database setup...\n');

    // Connect without database first, with multi-statement support
    // connection = await mysql.createConnection({
    //   url: process.env.DATABASE_URL
    // });

    connection = await mysql.createConnection({
      uri: process.env.DATABASE_URL,
      multipleStatements: true, // ✅ allows running multiple CREATE statements
    });

    console.log('✓ Connected to MySQL server');

    // Read and execute schema file
    const schemaPath = path.join(__dirname, 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    console.log(`✓ Reading schema file: ${schemaPath}`);
    
    // Execute all statements at once - mysql2 handles multi-statement properly
    try {
      await connection.query(schema);
      console.log('✓ Schema executed successfully');
    } catch (err) {
      // Ignore "database already exists" errors
      if (err.code !== 'ER_DB_CREATE_EXISTS') {
        throw err;
      }
    }

    console.log('✓ Database created successfully');
    console.log('✓ Tables created successfully');

    // Verify tables exist - use query instead of changeUser
    const dbName = process.env.DB_NAME || 'country_currency_db';
    await connection.query(`USE ${dbName}`);
    const [tables] = await connection.query('SHOW TABLES');
    
    console.log('\n📊 Tables created:');
    tables.forEach(table => {
      console.log(`   ✓ ${Object.values(table)[0]}`);
    });

    console.log('\n✅ Database setup complete!');
    console.log('\nNext steps:');
    console.log('1. Start server: npm start');
    console.log('2. Initialize data: curl -X POST http://localhost:3000/countries/refresh');

  } catch (error) {
    console.error('\n❌ Error setting up database:', error.message);
    
    if (error.code === 'ER_NOT_SUPPORTED_AUTH_MODE') {
      console.error('\n⚠️  Authentication error. Try running this SQL in MySQL:');
      console.error('   ALTER USER "root"@"localhost" IDENTIFIED WITH mysql_native_password BY "your_password";');
      console.error('   FLUSH PRIVILEGES;');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('\n⚠️  Connection refused. Make sure MySQL is running.');
    } else if (error.message.includes('Access denied')) {
      console.error('\n⚠️  Access denied. Check your .env file credentials.');
    }
    
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();


// const mysql = require('mysql2/promise');
// const fs = require('fs');
// const path = require('path');
// require('dotenv').config();

// async function setupDatabase() {
//   let connection;

//   try {
//     console.log('📦 Starting database setup...\n');

//     // Connect using the connection string
//     connection = await mysql.createConnection(process.env.DATABASE_URL);
//     console.log('✓ Connected to MySQL server');

//     const dbName = 'country_currency_db';

//     // Create DB if not exists and select it
//     await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
//     await connection.changeUser({ database: dbName });
//     console.log(`✓ Using database: ${dbName}`);

//     // Read and execute schema
//     const schemaPath = path.join(__dirname, 'database', 'schema.sql');
//     const schema = fs.readFileSync(schemaPath, 'utf8');
//     console.log(`✓ Reading schema file: ${schemaPath}`);

//     await connection.query(schema);
//     console.log('✓ Schema executed successfully');

//     console.log('\n✅ Database setup complete!');
//   } catch (error) {
//     console.error('\n❌ Error setting up database:', error.message);
//     process.exit(1);
//   } finally {
//     if (connection) await connection.end();
//   }
// }

// setupDatabase();
