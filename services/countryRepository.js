const { getConnection } = require('../database/connection');

async function findByName(name) {
  const connection = await getConnection();
  const [rows] = await connection.execute(
    'SELECT * FROM countries WHERE LOWER(name) = LOWER(?)',
    [name]
  );
  return rows[0] || null;
}

async function findAll(filters = {}) {
  const connection = await getConnection();
  let query = 'SELECT * FROM countries WHERE 1=1';
  const params = [];

  if (filters.region) {
    query += ' AND LOWER(region) = LOWER(?)';
    params.push(filters.region);
  }

  if (filters.currency) {
    query += ' AND LOWER(currency_code) = LOWER(?)';
    params.push(filters.currency);
  }

  // Sorting
  if (filters.sort) {
    if (filters.sort === 'gdp_desc') {
      query += ' ORDER BY estimated_gdp DESC';
    } else if (filters.sort === 'gdp_asc') {
      query += ' ORDER BY estimated_gdp ASC';
    } else if (filters.sort === 'population_desc') {
      query += ' ORDER BY population DESC';
    } else if (filters.sort === 'population_asc') {
      query += ' ORDER BY population ASC';
    }
  } else {
    query += ' ORDER BY name ASC';
  }

  const [rows] = await connection.execute(query, params);
  return rows;
}

async function insert(country) {
  const connection = await getConnection();
  const [result] = await connection.execute(
    `INSERT INTO countries 
    (name, capital, region, population, currency_code, exchange_rate, estimated_gdp, flag_url) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      country.name,
      country.capital || null,
      country.region || null,
      country.population,
      country.currency_code || null,
      country.exchange_rate || null,
      country.estimated_gdp || null,
      country.flag_url || null
    ]
  );
  return result.insertId;
}

async function update(name, country) {
  const connection = await getConnection();
  await connection.execute(
    `UPDATE countries 
    SET capital = ?, region = ?, population = ?, currency_code = ?, 
        exchange_rate = ?, estimated_gdp = ?, flag_url = ? 
    WHERE LOWER(name) = LOWER(?)`,
    [
      country.capital || null,
      country.region || null,
      country.population,
      country.currency_code || null,
      country.exchange_rate || null,
      country.estimated_gdp || null,
      country.flag_url || null,
      name
    ]
  );
}

async function deleteByName(name) {
  const connection = await getConnection();
  const [result] = await connection.execute(
    'DELETE FROM countries WHERE LOWER(name) = LOWER(?)',
    [name]
  );
  return result.affectedRows > 0;
}

async function getAll() {
  const connection = await getConnection();
  const [rows] = await connection.execute('SELECT * FROM countries');
  return rows;
}

async function getCount() {
  const connection = await getConnection();
  const [rows] = await connection.execute('SELECT COUNT(*) as count FROM countries');
  return rows[0].count;
}

// async function getTopCountriesByGDP(limit = 5) {
//   const connection = await getConnection();
//   const [rows] = await connection.execute(
//     'SELECT name, estimated_gdp FROM countries WHERE estimated_gdp IS NOT NULL ORDER BY estimated_gdp DESC LIMIT ?',
//     [limit]
//   );
//   return rows;
// }

async function getTopCountriesByGDP(limit = 5) {
  const connection = await getConnection();
  const safeLimit = Number(limit) || 5; // Ensure it's a number

  const [rows] = await connection.query(
    `SELECT name, estimated_gdp 
     FROM countries 
     WHERE estimated_gdp IS NOT NULL 
     ORDER BY estimated_gdp DESC 
     LIMIT ${safeLimit}`
  );

  return rows;
}


async function updateLastRefreshedAt() {
  const connection = await getConnection();
  await connection.execute(
    'UPDATE settings SET value = NOW() WHERE key_name = ?',
    ['last_refreshed_at']
  );
}

async function getLastRefreshedAt() {
  const connection = await getConnection();
  const [rows] = await connection.execute(
    'SELECT value FROM settings WHERE key_name = ?',
    ['last_refreshed_at']
  );
  return rows[0]?.value || null;
}

module.exports = {
  findByName,
  findAll,
  insert,
  update,
  deleteByName,
  getAll,
  getCount,
  getTopCountriesByGDP,
  updateLastRefreshedAt,
  getLastRefreshedAt
};

