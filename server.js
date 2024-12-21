
// server.js
const express = require('express');
const { Pool } = require('pg');  // Correct import for Pool
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000;

// Configure PostgreSQL connection pool
const pool = new Pool({
  host: 'localhost',      // Host of your PostgreSQL server
  port: 5432,      // Port (usually 5432)
  user: 'postgres',      // Your PostgreSQL username
  password: 'admin', // Your PostgreSQL password
  database: 'SIA'   // Your database name
});

// Test PostgreSQL connection
pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL:', err));

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Sample API endpoint to fetch data from PostgreSQL
app.get('/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM your_table_name');
    res.json(result.rows); // Send rows as JSON
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Error fetching data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
