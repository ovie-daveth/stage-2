# Country Currency & Exchange API

A RESTful API built with Node.js and Express that fetches country data from external APIs, stores it in MySQL, and provides CRUD operations with currency exchange rates.

## Features

- Fetch country data from restcountries.com
- Get exchange rates from open.er-api.com
- Store and cache data in MySQL database
- CRUD operations for countries
- Filtering and sorting capabilities
- Generate summary images
- Automatic GDP estimation

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd stage-2
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
# Login to MySQL
mysql -u root -p

# Run the schema file
source database/schema.sql
```

4. Create environment file:
Create a `.env` file in the root directory with the following variables:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=country_currency_db
DB_PORT=3306

PORT=3000

COUNTRIES_API_URL=https://restcountries.com/v2/all?fields=name,capital,region,population,flag,currencies
EXCHANGE_API_URL=https://open.er-api.com/v6/latest/USD
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The API will be available at `http://localhost:3000`

## API Endpoints

### POST /countries/refresh
Fetch all countries and exchange rates, then cache them in the database.

**Response:**
```json
{
  "message": "Countries refreshed successfully",
  "success_count": 250,
  "fail_count": 0,
  "total_processed": 250
}
```

### GET /countries
Get all countries from the database with optional filters and sorting.

**Query Parameters:**
- `region` - Filter by region (e.g., `?region=Africa`)
- `currency` - Filter by currency code (e.g., `?currency=NGN`)
- `sort` - Sort results (`gdp_desc`, `gdp_asc`, `population_desc`, `population_asc`)

**Example:** `GET /countries?region=Africa&sort=gdp_desc`

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
  }
]
```

### GET /countries/:name
Get one country by name.

**Example:** `GET /countries/Nigeria`

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

### DELETE /countries/:name
Delete a country record.

**Example:** `DELETE /countries/Nigeria`

**Response:**
```json
{
  "message": "Country deleted successfully"
}
```

### GET /status
Show total countries and last refresh timestamp.

**Response:**
```json
{
  "total_countries": 250,
  "last_refreshed_at": "2025-10-22T18:00:00Z"
}
```

### GET /countries/image
Serve the generated summary image (SVG format).

**Response:** SVG image file (can be viewed in any browser or converted to PNG)

## Project Structure

```
.
├── config.js                 # Configuration settings
├── server.js                 # Main server file
├── package.json             # Dependencies
├── README.md               # Documentation
├── database/
│   ├── schema.sql          # Database schema
│   └── connection.js       # Database connection
├── services/
│   ├── countriesService.js # External API clients
│   ├── countryRepository.js # Database operations
│   └── imageService.js     # Image generation
└── routes/
    ├── countries.js        # Country endpoints
    └── status.js           # Status endpoint
```

## Dependencies

- **express** - Web framework
- **mysql2** - MySQL client
- **axios** - HTTP client for external APIs
- **dotenv** - Environment variables
- **nodemon** - Development server (dev dependency)

**Note:** Image generation uses SVG format (no native dependencies required!)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DB_HOST | Database host | localhost |
| DB_USER | Database user | root |
| DB_PASSWORD | Database password | - |
| DB_NAME | Database name | country_currency_db |
| DB_PORT | Database port | 3306 |
| PORT | Server port | 3000 |
| COUNTRIES_API_URL | Countries API endpoint | restcountries.com |
| EXCHANGE_API_URL | Exchange rates API endpoint | open.er-api.com |

## Error Handling

The API returns consistent JSON error responses:

- **400 Bad Request** - Validation failed
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error
- **503 Service Unavailable** - External API unavailable

## Testing

### Using cURL

```bash
# Refresh countries
curl -X POST http://localhost:3000/countries/refresh

# Get all countries
curl http://localhost:3000/countries

# Get countries by region
curl http://localhost:3000/countries?region=Africa

# Get status
curl http://localhost:3000/status
```

### Using Postman

Import the API collection and test each endpoint.

## Notes

- The `estimated_gdp` field is calculated as: `population × random(1000-2000) ÷ exchange_rate`
- Countries with multiple currencies use the first currency code
- Countries without currencies have `null` values for currency-related fields
- The summary image is generated as SVG in the `cache/` directory after refresh
- SVG images can be viewed in browsers or converted to PNG if needed
- All country names are case-insensitive for matching
- Windows compatible - no build tools required!

## License

ISC

