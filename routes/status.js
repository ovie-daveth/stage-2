const express = require('express');
const router = express.Router();
const countryRepository = require('../services/countryRepository');

// GET /status
router.get('/', async (req, res) => {
  try {
    const totalCountries = await countryRepository.getCount();
    const lastRefreshedAt = await countryRepository.getLastRefreshedAt();

    res.json({
      total_countries: totalCountries,
      last_refreshed_at: lastRefreshedAt
    });
  } catch (error) {
    console.error('Error fetching status:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});

module.exports = router;

