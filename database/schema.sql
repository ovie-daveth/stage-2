-- Create database
CREATE DATABASE IF NOT EXISTS country_currency_db;
USE country_currency_db;

-- Create countries table
CREATE TABLE IF NOT EXISTS countries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  capital VARCHAR(255),
  region VARCHAR(255),
  population BIGINT NOT NULL,
  currency_code VARCHAR(10),
  exchange_rate DECIMAL(20, 4),
  estimated_gdp DECIMAL(30, 2),
  flag_url VARCHAR(500),
  last_refreshed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_name (name),
  INDEX idx_region (region),
  INDEX idx_currency (currency_code),
  INDEX idx_gdp (estimated_gdp)
);

-- Create settings table for tracking refresh timestamp
CREATE TABLE IF NOT EXISTS settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  key_name VARCHAR(100) NOT NULL UNIQUE,
  value TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert initial setting
INSERT INTO settings (key_name, value) VALUES ('last_refreshed_at', NOW()) 
ON DUPLICATE KEY UPDATE value = NOW();

