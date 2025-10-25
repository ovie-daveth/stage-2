# Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites
- Node.js installed
- MySQL installed and running

## Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Create .env File
Copy `env.example` to `.env`:
```bash
copy env.example .env
```

Then edit `.env` and replace `your_password_here` with your actual MySQL password.

### 3. Create Database
**Easy way:**
```bash
npm run setup-db
```

**Or manually:**
```bash
node setup-database.js
```

### 4. Start Server
```bash
npm start
```

You should see:
```
✓ Database connected successfully
✓ Server running on port 3000
✓ API available at http://localhost:3000
```

### 5. Initialize Data
In another terminal:
```bash
curl -X POST http://localhost:3000/countries/refresh
```

Or visit `http://localhost:3000/countries/refresh` with POST method.

### 6. Test the API
```bash
# Get all countries
curl http://localhost:3000/countries

# Get African countries
curl http://localhost:3000/countries?region=Africa

# Get status
curl http://localhost:3000/status
```

Or run the test script:
```bash
node test-api.js
```

## Common Issues

### Port Already in Use
Change PORT in `.env` to another port (e.g., 3001)

### Database Connection Failed
- Ensure MySQL is running
- Check credentials in `.env`
- Verify database exists

### Canvas/Image Issues
The project uses SVG for images (no native dependencies needed). If you see image-related errors, they should be resolved automatically.

### External API Errors
- Check internet connection
- Wait a few minutes and retry
- Verify APIs are accessible

## Next Steps

- Read `README.md` for complete documentation
- Check `EXAMPLES.md` for code examples
- Review `FEATURES.md` for implementation details
- See `SETUP.md` for detailed setup instructions

## Need Help?

Check the documentation files:
- **README.md** - Main documentation
- **SETUP.md** - Detailed setup
- **EXAMPLES.md** - Code examples
- **FEATURES.md** - Implementation details

