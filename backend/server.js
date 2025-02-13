import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import db from './db.js' // Koneksi ke database
import dotenv from 'dotenv'
import cron from 'node-cron' // Untuk penjadwalan pengiriman email

dotenv.config() // Memuat variabel lingkungan dari file .env

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Membuat transporter menggunakan SMTP Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Email yang digunakan untuk mengirim
    pass: process.env.EMAIL_PASS, // App password yang baru dibuat
  },
})

// Fungsi untuk mengirim email dengan format HTML
const sendEmail = (to, subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    html: message, // Menggunakan 'html' daripada 'text' untuk email dengan format HTML
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error)
    } else {
      console.log('Email sent:', info.response)
    }
  })
}
app.post('/api/check-user', (req, res) => {
  const { email } = req.body
  const query = 'SELECT * FROM users WHERE email = ?'
  db.query(query, [email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message })

    if (result.length > 0) {
      // Jika email ditemukan
      res.json({ exists: true })
    } else {
      // Jika email tidak ditemukan
      res.json({ exists: false })
    }
  })
})
// API untuk mendaftar pengguna
app.post('/api/register', (req, res) => {
  const { name, email } = req.body
  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)'
  db.query(sql, [name, email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ message: 'Terdaftar! Kamu akan mendapat pesan spesial di Hari Valentine ❤️' })
  })
})

// Endpoint untuk mendapatkan pesan motivasi random
app.get('/api/motivations', (req, res) => {
  const query = 'SELECT * FROM valentine_messages' // Ganti dengan nama tabel yang sesuai
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error', details: err })
    }
    const randomMotivation = results[Math.floor(Math.random() * results.length)]
    res.json(randomMotivation)
  })
})

// Fungsi untuk mengirimkan email pada tanggal 13 Februari pukul 06:00
cron.schedule('30 2 14 2 *', () => {
  const query = 'SELECT * FROM users' // Ambil semua pengguna yang sudah mendaftar
  db.query(query, (err, users) => {
    if (err) {
      console.log(err)
      return
    }

    // Ambil pesan motivasi acak
    const motivationQuery = 'SELECT * FROM valentine_messages'
    db.query(motivationQuery, (err, motivations) => {
      if (err) {
        console.log(err)
        return
      }

      const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)]

      // Modifikasi pesan motivasi untuk menambahkan spasi atau paragraf
      const formattedMessage = `
        <p><strong>Selamat Hari Valentine!</strong></p>
        <p>${randomMotivation.message}</p>
        <p>Semoga kamu memiliki Hari Valentine yang luar biasa!</p>
        <p style="color: red;">❤️ Dari kamu untukmu!</p>
        <p><em>Pesan ini dikirimkan secara otomatis melalui website Asmaraloka.</em></p>
        
        

      `

      // Kirim email ke semua pengguna
      users.forEach((user) => {
        sendEmail(user.email, 'Selamat Hari Valentine!', formattedMessage)
      })
    })
  })
})

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
