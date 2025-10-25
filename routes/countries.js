const express = require('express');
const router = express.Router();
const countryRepository = require('../services/countryRepository');
const countriesService = require('../services/countriesService');
const imageService = require('../services/imageService');

// POST /countries/refresh
router.post('/refresh', async (req, res) => {
  try {
    let countries, exchangeRates;

    // Fetch data from external APIs
    try {
      [countries, exchangeRates] = await Promise.all([
        countriesService.fetchCountries(),
        countriesService.fetchExchangeRates()
      ]);
    } catch (error) {
      return res.status(503).json({
        error: 'External data source unavailable',
        details: error.message
      });
    }

    let successCount = 0;
    let failCount = 0;

    // Process each country
    for (const country of countries) {
      try {
        const currencyCode = countriesService.extractCurrencyCode(country);
        let exchangeRate = null;
        let estimatedGDP = null;

        if (currencyCode) {
          exchangeRate = exchangeRates[currencyCode] || null;
          if (exchangeRate) {
            estimatedGDP = countriesService.calculateEstimatedGDP(
              country.population,
              exchangeRate
            );
          }
        }

        const countryData = {
          name: country.name,
          capital: country.capital || null,
          region: country.region || null,
          population: country.population,
          currency_code: currencyCode,
          exchange_rate: exchangeRate,
          estimated_gdp: estimatedGDP,
          flag_url: country.flag || null
        };

        // Check if country exists
        const existing = await countryRepository.findByName(country.name);
        
        if (existing) {
          await countryRepository.update(country.name, countryData);
        } else {
          await countryRepository.insert(countryData);
        }
        
        successCount++;
      } catch (error) {
        console.error(`Error processing country ${country.name}:`, error.message);
        failCount++;
      }
    }

    // Update global refresh timestamp
    await countryRepository.updateLastRefreshedAt();

    // Generate summary image
    try {
      await imageService.generateSummaryImage();
    } catch (error) {
      console.error('Error generating summary image:', error.message);
    }

    res.json({
      message: 'Countries refreshed successfully',
      success_count: successCount,
      fail_count: failCount,
      total_processed: countries.length
    });
  } catch (error) {
    console.error('Error refreshing countries:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});

// GET /countries
router.get('/', async (req, res) => {
  try {
    const filters = {
      region: req.query.region,
      currency: req.query.currency,
      sort: req.query.sort
    };

    const countries = await countryRepository.findAll(filters);
    res.json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});

// GET /countries/image (must come before /:name to avoid routing conflict)
router.get('/image', async (req, res) => {
  try {
    const imagePath = imageService.getSummaryImagePath();
    
    if (!imagePath) {
      return res.status(404).json({
        error: 'Summary image not found'
      });
    }

    res.setHeader('Content-Type', 'image/svg+xml');
    res.sendFile(imagePath);
  } catch (error) {
    console.error('Error serving image:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});

// GET /countries/:name
router.get('/:name', async (req, res) => {
  try {
    const country = await countryRepository.findByName(req.params.name);
    
    if (!country) {
      return res.status(404).json({
        error: 'Country not found'
      });
    }

    res.json(country);
  } catch (error) {
    console.error('Error fetching country:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});

// DELETE /countries/:name
router.delete('/:name', async (req, res) => {
  try {
    const deleted = await countryRepository.deleteByName(req.params.name);
    
    if (!deleted) {
      return res.status(404).json({
        error: 'Country not found'
      });
    }

    res.json({
      message: 'Country deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting country:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});

module.exports = router;

