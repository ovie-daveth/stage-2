/**
 * Simple API Test Script
 * Run with: node test-api.js
 */

const axios = require('axios');

const BASE_URL = process.env.API_URL || 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Testing Country Currency Exchange API\n');
  console.log(`📍 Base URL: ${BASE_URL}\n`);

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing health check endpoint...');
    const healthResponse = await axios.get(BASE_URL);
    console.log('✅ Health check:', healthResponse.data.message);
    console.log('   Available endpoints:', Object.keys(healthResponse.data.endpoints).length);
    console.log('');

    // Test 2: Refresh Countries
    console.log('2️⃣ Testing POST /countries/refresh...');
    try {
      const refreshResponse = await axios.post(`${BASE_URL}/countries/refresh`);
      console.log('✅ Refresh successful');
      console.log('   Success count:', refreshResponse.data.success_count);
      console.log('   Fail count:', refreshResponse.data.fail_count);
      console.log('');
    } catch (error) {
      console.log('⚠️  Refresh failed:', error.response?.data?.error || error.message);
      console.log('');
    }

    // Test 3: Get Status
    console.log('3️⃣ Testing GET /status...');
    const statusResponse = await axios.get(`${BASE_URL}/status`);
    console.log('✅ Status retrieved');
    console.log('   Total countries:', statusResponse.data.total_countries);
    console.log('   Last refreshed:', statusResponse.data.last_refreshed_at);
    console.log('');

    // Test 4: Get All Countries
    console.log('4️⃣ Testing GET /countries...');
    const countriesResponse = await axios.get(`${BASE_URL}/countries`);
    console.log('✅ Countries retrieved');
    console.log('   Count:', countriesResponse.data.length);
    if (countriesResponse.data.length > 0) {
      console.log('   First country:', countriesResponse.data[0].name);
    }
    console.log('');

    // Test 5: Get Countries with Filters
    console.log('5️⃣ Testing GET /countries?region=Africa...');
    const africaResponse = await axios.get(`${BASE_URL}/countries?region=Africa`);
    console.log('✅ African countries retrieved');
    console.log('   Count:', africaResponse.data.length);
    console.log('');

    // Test 6: Get Single Country
    if (countriesResponse.data.length > 0) {
      const testCountry = countriesResponse.data[0].name;
      console.log(`6️⃣ Testing GET /countries/${testCountry}...`);
      const singleResponse = await axios.get(`${BASE_URL}/countries/${testCountry}`);
      console.log('✅ Single country retrieved');
      console.log('   Name:', singleResponse.data.name);
      console.log('   Population:', singleResponse.data.population);
      console.log('   Currency:', singleResponse.data.currency_code);
      console.log('   GDP:', singleResponse.data.estimated_gdp);
      console.log('');
    }

    // Test 7: Get Summary Image
    console.log('7️⃣ Testing GET /countries/image...');
    try {
      const imageResponse = await axios.get(`${BASE_URL}/countries/image`, {
        responseType: 'arraybuffer'
      });
      console.log('✅ Summary image retrieved');
      console.log('   Size:', imageResponse.data.length, 'bytes');
      console.log('');
    } catch (error) {
      console.log('⚠️  Image not found:', error.response?.data?.error || error.message);
      console.log('');
    }

    console.log('✨ All tests completed!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
  }
}

// Run tests
testAPI();

