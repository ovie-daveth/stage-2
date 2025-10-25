# API Usage Examples

## Basic Usage

### 1. Initialize/Refresh Country Data

**Request:**
```bash
POST http://localhost:3000/countries/refresh
```

**Response:**
```json
{
  "message": "Countries refreshed successfully",
  "success_count": 250,
  "fail_count": 0,
  "total_processed": 250
}
```

### 2. Get All Countries

**Request:**
```bash
GET http://localhost:3000/countries
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Nigeria",
    "capital": "Abuja",
    "region": "Africa",
    "population": 206139589,
    "currency_code": "NGN",
    "exchange_rate": 1600.23,
    "estimated_gdp": 25767448125.2,
    "flag_url": "https://flagcdn.com/ng.svg",
    "last_refreshed_at": "2025-10-22T18:00:00Z"
  },
  {
    "id": 2,
    "name": "Ghana",
    "capital": "Accra",
    "region": "Africa",
    "population": 31072940,
    "currency_code": "GHS",
    "exchange_rate": 15.34,
    "estimated_gdp": 3029834520.6,
    "flag_url": "https://flagcdn.com/gh.svg",
    "last_refreshed_at": "2025-10-22T18:00:00Z"
  }
]
```

### 3. Filter by Region

**Request:**
```bash
GET http://localhost:3000/countries?region=Africa
```

**Response:** Returns only African countries

### 4. Filter by Currency

**Request:**
```bash
GET http://localhost:3000/countries?currency=NGN
```

**Response:** Returns countries using NGN currency

### 5. Sort by GDP (Descending)

**Request:**
```bash
GET http://localhost:3000/countries?sort=gdp_desc
```

**Response:** Returns countries sorted by estimated GDP (highest first)

### 6. Sort by Population (Ascending)

**Request:**
```bash
GET http://localhost:3000/countries?sort=population_asc
```

**Response:** Returns countries sorted by population (lowest first)

### 7. Combined Filters

**Request:**
```bash
GET http://localhost:3000/countries?region=Africa&sort=gdp_desc
```

**Response:** Returns African countries sorted by GDP (highest first)

### 8. Get Single Country

**Request:**
```bash
GET http://localhost:3000/countries/Nigeria
```

**Response:**
```json
{
  "id": 1,
  "name": "Nigeria",
  "capital": "Abuja",
  "region": "Africa",
  "population": 206139589,
  "currency_code": "NGN",
  "exchange_rate": 1600.23,
  "estimated_gdp": 25767448125.2,
  "flag_url": "https://flagcdn.com/ng.svg",
  "last_refreshed_at": "2025-10-22T18:00:00Z"
}
```

### 9. Delete a Country

**Request:**
```bash
DELETE http://localhost:3000/countries/Nigeria
```

**Response:**
```json
{
  "message": "Country deleted successfully"
}
```

### 10. Get API Status

**Request:**
```bash
GET http://localhost:3000/status
```

**Response:**
```json
{
  "total_countries": 250,
  "last_refreshed_at": "2025-10-22T18:00:00Z"
}
```

### 11. Get Summary Image

**Request:**
```bash
GET http://localhost:3000/countries/image
```

**Response:** PNG image file

### 12. Country Not Found

**Request:**
```bash
GET http://localhost:3000/countries/NonExistentCountry
```

**Response:**
```json
{
  "error": "Country not found"
}
```

### 13. External API Unavailable

**Request:**
```bash
POST http://localhost:3000/countries/refresh
```
(When external APIs are down)

**Response:**
```json
{
  "error": "External data source unavailable",
  "details": "Could not fetch data from Countries API: ..."
}
```

## Using JavaScript/Node.js

```javascript
const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

// Refresh countries
async function refreshCountries() {
  try {
    const response = await axios.post(`${BASE_URL}/countries/refresh`);
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}

// Get all countries
async function getAllCountries() {
  try {
    const response = await axios.get(`${BASE_URL}/countries`);
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}

// Get countries by region
async function getCountriesByRegion(region) {
  try {
    const response = await axios.get(`${BASE_URL}/countries?region=${region}`);
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}

// Get single country
async function getCountry(name) {
  try {
    const response = await axios.get(`${BASE_URL}/countries/${name}`);
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}

// Delete country
async function deleteCountry(name) {
  try {
    const response = await axios.delete(`${BASE_URL}/countries/${name}`);
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}

// Get status
async function getStatus() {
  try {
    const response = await axios.get(`${BASE_URL}/status`);
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}
```

## Using Python

```python
import requests

BASE_URL = 'http://localhost:3000'

# Refresh countries
def refresh_countries():
    response = requests.post(f'{BASE_URL}/countries/refresh')
    print(response.json())

# Get all countries
def get_all_countries():
    response = requests.get(f'{BASE_URL}/countries')
    print(response.json())

# Get countries by region
def get_countries_by_region(region):
    response = requests.get(f'{BASE_URL}/countries', params={'region': region})
    print(response.json())

# Get single country
def get_country(name):
    response = requests.get(f'{BASE_URL}/countries/{name}')
    print(response.json())

# Delete country
def delete_country(name):
    response = requests.delete(f'{BASE_URL}/countries/{name}')
    print(response.json())

# Get status
def get_status():
    response = requests.get(f'{BASE_URL}/status')
    print(response.json())
```

## Using cURL

```bash
# Refresh countries
curl -X POST http://localhost:3000/countries/refresh

# Get all countries
curl http://localhost:3000/countries

# Get African countries
curl http://localhost:3000/countries?region=Africa

# Get countries sorted by GDP
curl http://localhost:3000/countries?sort=gdp_desc

# Get Nigerian
curl http://localhost:3000/countries/Nigeria

# Delete Nigeria
curl -X DELETE http://localhost:3000/countries/Nigeria

# Get status
curl http://localhost:3000/status

# Get summary image
curl http://localhost:3000/countries/image -o summary.png
```

## Using Postman Collection

Create a new collection in Postman with these requests:

1. **Refresh Countries** - POST {{base_url}}/countries/refresh
2. **Get All Countries** - GET {{base_url}}/countries
3. **Get Countries by Region** - GET {{base_url}}/countries?region=Africa
4. **Get Single Country** - GET {{base_url}}/countries/Nigeria
5. **Delete Country** - DELETE {{base_url}}/countries/Nigeria
6. **Get Status** - GET {{base_url}}/status
7. **Get Summary Image** - GET {{base_url}}/countries/image

Set environment variable: `base_url = http://localhost:3000`

