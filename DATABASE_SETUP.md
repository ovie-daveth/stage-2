# Database Setup Guide

## No Migrations Needed!

This project uses a simple SQL schema file. You just need to run it **once** to set up your database.

## Quick Setup (2 Steps)

### Step 1: Create `.env` file

Copy and paste this into a new file called `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=country_currency_db
DB_PORT=3306

PORT=3000
```

**Important:** Replace `your_password_here` with your actual MySQL password!

### Step 2: Run the Setup Script

**Easiest Way (Recommended):**
```bash
npm run setup-db
```

Or directly:
```bash
node setup-database.js
```

**Alternative: Using MySQL Command Line**
```bash
# PowerShell
Get-Content database/schema.sql | mysql -u root -p

# Or manually in MySQL client
# Copy and paste contents of database/schema.sql
```

### Step 3: Verify It Worked

```bash
mysql -u root -p -e "USE country_currency_db; SHOW TABLES;"
```

You should see:
```
+--------------------------------+
| Tables_in_country_currency_db  |
+--------------------------------+
| countries                       |
| settings                        |
+--------------------------------+
```

## What Gets Created?

### Database
- `country_currency_db` - Main database

### Tables
1. **countries** - Stores all country data
   - id, name, capital, region, population
   - currency_code, exchange_rate, estimated_gdp
   - flag_url, last_refreshed_at

2. **settings** - Stores refresh timestamps
   - key_name, value, updated_at

### Indexes
- Speeds up queries on: name, region, currency_code, estimated_gdp

## Troubleshooting

### "Access Denied" Error
- Make sure MySQL is running
- Check your password in `.env`
- Try logging in first: `mysql -u root -p`

### "Database Already Exists"
- No problem! The schema uses `CREATE DATABASE IF NOT EXISTS`
- It will skip creation if it already exists

### "Can't Find database/schema.sql"
- Make sure you're in the project root directory
- Run: `dir database` (Windows) or `ls database` (Mac/Linux)

### Port Already in Use
- Change `PORT=3000` to another port in `.env`
- Example: `PORT=3001`

## Testing Your Setup

After setup, start the server:
```bash
npm start
```

You should see:
```
✓ Database connected successfully
✓ Server running on port 3000
```

Then initialize data:
```bash
curl -X POST http://localhost:3000/countries/refresh
```

## That's It!

No migrations to run. No Sequelize. No ORM.
Just pure SQL - simple and fast! 🚀

## Need to Reset?

If you need to start fresh:
```bash
mysql -u root -p -e "DROP DATABASE IF EXISTS country_currency_db;"
mysql -u root -p < database/schema.sql
```

Then refresh the data again:
```bash
curl -X POST http://localhost:3000/countries/refresh
```

