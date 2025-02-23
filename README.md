# Customer Registration API

This is a simple Node.js-based REST API for customer registration, using **Express.js** for handling requests and **SQLite** as the database.

## Features

- Validates and registers customer details, including name, address, email, date of birth, gender, age, and payment details.
- Ensures input validation for email, credit card number (12 digits), and CVV (3 digits).
- Stores customer data in an SQLite database with unique email constraints.

## Project Structure

- `server.js` - Sets up the Express server and defines the `/register` endpoint for customer registration.
- `database.js` - Initializes the SQLite database and creates the `customer` table if it doesn't exist.
