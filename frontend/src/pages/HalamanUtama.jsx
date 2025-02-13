import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";


function HalamanUtama() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({ name: "", email: "" });
  const [isExistingUser, setIsExistingUser] = useState(false);

  const validateForm = () => {
    let errors = {};
    if (!name) errors.name = "Nama harus diisi!";
    if (!email) errors.email = "Email harus diisi!";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email tidak valid!";
    return errors;
  };

  const checkUserExistence = async (email) => {
    try {
      const res = await axios.post("http://localhost:5000/api/check-user", { email });
      if (res.data.exists) {
        setIsExistingUser(true); // Jika user sudah ada
        return true;
      }
      setIsExistingUser(false); // Jika user tidak ada
      return false;
    } catch (err) {
      console.error("Error checking user existence:", err);
      setIsExistingUser(false);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors({ name: "", email: "" });
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setLoading(false);
      return;
    }

    const userExists = await checkUserExistence(email);
    if (userExists) {
      setMessage("😱 Email ini sudah terdaftar! Coba email yang lain.");
      setIsSuccess(false);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/register", { name, email });
      setMessage(`Yeaay! ${res.data.message}`);
      setIsSuccess(true);
      setName("");
      setEmail("");
    } catch (err) {
      setMessage("😱 Waduh! Servernya lagi badmood. Coba lagi bentar ya!");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-400 animate-bgMove relative">
      {/* Posisi animasi hewan di tengah atas form */}
      {isSuccess ? (
        <motion.div
          className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl text-center z-20 max-w-md sm:max-w-lg w-full"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-extrabold text-green-600 animate-bounce">
            Pesan Berhasil Dikirim! 🎉
          </h2>
          <p className="text-lg sm:text-xl mt-3 text-gray-700">
            Yeaay! Terdaftar! Kamu akan mendapat pesan spesial di Hari Valentine ❤️
          </p>
          <motion.div
            className="mt-4 text-white bg-green-500 px-6 py-3 rounded-lg cursor-pointer transform transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSuccess(false)}
          >
            Kembali ke Form
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl text-center z-20 max-w-md sm:max-w-lg w-full"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-4xl font-extrabold text-pink-600 animate-bounce delay-300">
            What....? Valentine?
          </h2>
          <p className="text-gray-700 mt-3 sm:mt-4 text-lg sm:text-xl animate-fadeIn">
            <motion.span
              className="font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-blue-400 text-transparent bg-clip-text text-xl sm:text-2xl"
              whileHover={{ scale: 1.1 }}
            >
              This will make your day, Hope
            </motion.span>
          </p>
          <form onSubmit={handleSubmit} className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
            <motion.input
              type="text"
              placeholder="Nama kamu ya.."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`border-2 rounded-lg p-3 sm:p-4 w-full transform transition-all ${formErrors.name ? "border-red-500" : "border-pink-400"}`}
              whileFocus={{ scale: 1.05 }}
              whileHover={{ scale: 1.1 }}
            />
            {formErrors.name && (
              <motion.p
                className="text-red-600 text-sm mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {formErrors.name}
              </motion.p>
            )}

            <motion.input
              type="email"
              placeholder="Email kamu yang masih aktif ya.."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`border-2 rounded-lg p-3 sm:p-4 w-full transform transition-all ${formErrors.email ? "border-red-500" : "border-pink-400"}`}
              whileFocus={{ scale: 1.05 }}
              whileHover={{ scale: 1.1 }}
            />
            {formErrors.email && (
              <motion.p
                className="text-red-600 text-sm mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {formErrors.email}
              </motion.p>
            )}

            <motion.button
              type="submit"
              className="w-full mt-3 sm:mt-4 bg-pink-500 text-white text-lg sm:text-xl font-bold py-2 sm:py-3 rounded-lg transform transition-all"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-t-4 border-white rounded-full animate-spin mx-auto" />
              ) : (
                "Hopee"
              )}
            </motion.button>
          </form>
          {message && (
            <motion.p
              className="mt-3 sm:mt-4 text-red-600 text-lg sm:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {message}
            </motion.p>
          )}
        </motion.div>
      )}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <a className="text-white font-extralight italic " href="https://www.instagram.com/ipannsmsg_?igsh=MWVmNzJyYmpqMzgyZg==" target="_blank" rel="noopener noreferrer">
          by Ivan 👀
        </a>
      </div>
    </div>
  );
}

export default HalamanUtama;
