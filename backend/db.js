// db.js
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();  // Pastikan dotenv sudah ter-load dengan baik

// Cek apakah variabel lingkungan telah ter-load dengan benar
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
console.log('DB_NAME:', process.env.DB_NAME);

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Cek koneksi ke database
connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

export default connection;
