const express = require('express');
const config = require('./config');
const { initializeDatabase } = require('./database/connection');
const countriesRouter = require('./routes/countries');
const statusRouter = require('./routes/status');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/countries', countriesRouter);
app.use('/status', statusRouter);

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'Country Currency Exchange API',
    version: '1.0.0',
    endpoints: {
      'POST /countries/refresh': 'Fetch and cache countries',
      'GET /countries': 'Get all countries (supports ?region, ?currency, ?sort)',
      'GET /countries/:name': 'Get one country by name',
      'DELETE /countries/:name': 'Delete a country',
      'GET /status': 'Get API status',
      'GET /countries/image': 'Get summary image'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    details: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found'
  });
});

// Start server
async function startServer() {
  try {
    await initializeDatabase();
    
    app.listen(config.server.port, () => {
      console.log(`✓ Server running on port ${config.server.port}`);
      console.log(`✓ API available at http://localhost:${config.server.port}`);
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();

module.exports = app;

