# Setup Instructions

## Quick Start Guide

### 1. Install Node.js Dependencies
```bash
npm install
```

### 2. Set Up MySQL Database

**Option A: Using MySQL Command Line**
```bash
mysql -u root -p
```
Then run:
```sql
source database/schema.sql
```

**Option B: Manual Setup**
```sql
CREATE DATABASE IF NOT EXISTS country_currency_db;
USE country_currency_db;
```

Then copy and paste the contents of `database/schema.sql` into your MySQL client.

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=country_currency_db
DB_PORT=3306

PORT=3000
```

See `ENV_TEMPLATE.txt` for a complete template.

### 4. Start the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

### 5. Initialize Data

After starting the server, call the refresh endpoint:

```bash
curl -X POST http://localhost:3000/countries/refresh
```

Or use Postman/Thunder Client to send a POST request to `http://localhost:3000/countries/refresh`

## Troubleshooting

### Database Connection Error
- Ensure MySQL is running
- Check database credentials in `.env`
- Verify database exists: `SHOW DATABASES;`

### External API Errors
- Check internet connection
- Verify API endpoints are accessible
- Wait a few minutes and retry

### Port Already in Use
- Change the PORT in `.env` file
- Or stop the process using port 3000

### Canvas Installation Issues (Windows)
If you encounter issues installing the `canvas` package:

```bash
npm install canvas --build-from-source
```

Or use an alternative approach without native dependencies.

## Testing the API

### Using cURL

```bash
# Get all countries
curl http://localhost:3000/countries

# Get African countries
curl http://localhost:3000/countries?region=Africa

# Get countries sorted by GDP
curl http://localhost:3000/countries?sort=gdp_desc

# Get one country
curl http://localhost:3000/countries/Nigeria

# Get status
curl http://localhost:3000/status

# Get summary image
curl http://localhost:3000/countries/image -o summary.png
```

### Using Browser
Visit `http://localhost:3000` to see available endpoints.

## Production Deployment

### Railway
1. Create a Railway account
2. Create a new project
3. Connect your GitHub repository
4. Add MySQL database
5. Set environment variables
6. Deploy

### Heroku
1. Create a Heroku account
2. Install Heroku CLI
3. Create app: `heroku create`
4. Add MySQL addon: `heroku addons:create jawsdb`
5. Set config vars
6. Deploy: `git push heroku main`

### AWS EC2
1. Launch EC2 instance
2. Install Node.js and MySQL
3. Clone repository
4. Set up environment variables
5. Start server with PM2

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| DB_HOST | Yes | MySQL host |
| DB_USER | Yes | MySQL username |
| DB_PASSWORD | Yes | MySQL password |
| DB_NAME | Yes | Database name |
| DB_PORT | No | MySQL port (default: 3306) |
| PORT | No | Server port (default: 3000) |

