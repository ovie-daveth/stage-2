// const mysql = require('mysql2/promise');
// const config = require('../config');

// let pool;

// async function getConnection() {
//   if (!pool) {
//     pool = mysql.createPool({
//       host: config.db.host,
//       user: config.db.user,
//       password: config.db.password,
//       database: config.db.database,
//       port: config.db.port,
//       waitForConnections: true,
//       connectionLimit: 10,
//       queueLimit: 0
//     });
//   }
//   return pool;
// }

// async function initializeDatabase() {
//   try {
//     const connection = await getConnection();
//     console.log('✓ Database connected successfully');
//     return connection;
//   } catch (error) {
//     console.error('✗ Database connection failed:', error.message);
//     throw error;
//   }
// }

// module.exports = {
//   getConnection,
//   initializeDatabase
// };

const mysql = require('mysql2/promise');
const config = require('../config');

let pool;

async function getConnection() {
  if (!pool) {
    pool = mysql.createPool(config.db.url);
  }
  return pool;
}

async function initializeDatabase() {
  try {
    const connection = await getConnection();
    console.log('✓ Database connected successfully');
    return connection;
  } catch (error) {
    console.error('✗ Database connection failed:', error.message);
    throw error;
  }
}

module.exports = {
  getConnection,
  initializeDatabase
};


