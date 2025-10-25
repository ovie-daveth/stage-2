const axios = require('axios');
const config = require('../config');

async function fetchCountries() {
  try {
    const response = await axios.get(config.external.countriesApiUrl, {
      timeout: 30000
    });
    console.log("check", response.data)
    return response.data;
  } catch (error) {
    throw new Error(`Could not fetch data from Countries API: ${error.message}`);
  }
}

async function fetchExchangeRates() {
  try {
    const response = await axios.get(config.external.exchangeApiUrl, {
      timeout: 30000
    });
    return response.data.rates;
  } catch (error) {
    throw new Error(`Could not fetch data from Exchange Rates API: ${error.message}`);
  }
}

function extractCurrencyCode(country) {
  if (!country.currencies || country.currencies.length === 0) {
    return null;
  }
  return country.currencies[0].code || null;
}

function calculateEstimatedGDP(population, exchangeRate) {
  if (!exchangeRate || exchangeRate === 0) {
    return null;
  }
  const randomMultiplier = Math.random() * (2000 - 1000) + 1000;
  return (population * randomMultiplier) / exchangeRate;
}

module.exports = {
  fetchCountries,
  fetchExchangeRates,
  extractCurrencyCode,
  calculateEstimatedGDP
};

