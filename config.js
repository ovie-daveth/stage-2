require('dotenv').config();

module.exports = {
  db: {
    // host: process.env.DB_HOST || 'localhost',
    // user: process.env.DB_USER || 'root',
    // password: process.env.DB_PASSWORD || 'Thepreacher1',
    // database: process.env.DB_NAME || 'country_currency_db',
    // port: process.env.DB_PORT || 3306
    url: process.env.DATABASE_URL
  },
  server: {
    port: process.env.PORT || 3000
  },
  external: {
    countriesApiUrl: process.env.COUNTRIES_API_URL || 'https://restcountries.com/v2/all?fields=name,capital,region,population,flag,currencies',
    exchangeApiUrl: process.env.EXCHANGE_API_URL || 'https://open.er-api.com/v6/latest/USD'
  }
};

