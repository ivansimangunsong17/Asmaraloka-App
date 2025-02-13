import React from 'react';
import { motion } from 'framer-motion'; // Untuk animasi
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-500 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Karakter Lucu */}
      <motion.div
        className="flex items-center justify-center mb-6"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      >
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white flex items-center justify-center text-3xl sm:text-4xl text-yellow-500">
          <motion.span
            className="text-pink-500"
            animate={{ rotate: -45 }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            🤔
          </motion.span>
        </div>
      </motion.div>

      {/* Pesan Lucu */}
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-white animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Oops! 404
      </motion.h2>

      <motion.p
        className="text-xl sm:text-2xl text-white mt-4 animate-fadeIn text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Sepertinya halaman ini hilang entah ke mana... <br />
        Mungkin sedang berlibur?
      </motion.p>

      {/* Tombol Kembali */}
      <motion.div
        className="mt-6"
        animate={{ scale: 1.1 }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/" className="bg-pink-500 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-md hover:shadow-lg">
          Kembali ke Beranda
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;
