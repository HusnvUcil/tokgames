// Import package yang dibutuhkan
const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();  // Untuk membaca file .env

// Inisialisasi express app
const app = express();
const port = process.env.PORT || 3000;

// Membuat koneksi ke database MySQL
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,        // Diambil dari .env
  port: process.env.MYSQL_PORT,        // Diambil dari .env
  user: process.env.MYSQL_USER,        // Diambil dari .env
  password: process.env.MYSQL_PASSWORD, // Diambil dari .env
  database: process.env.MYSQL_DATABASE  // Diambil dari .env
});

// Cek koneksi MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database!');
});

// Definisikan route untuk mendapatkan semua data dari tabel "users"
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);  // Mengirimkan hasil query dalam format JSON
  });
});

// Menjalankan server di port yang ditentukan
app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`);
});
