import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [hideForm, setHideForm] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setHideForm(true); // start animation
    setTimeout(() => {
      navigate('/profile'); // go to profile page after animation
    }, 600);
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-[#0f172a] text-white px-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-lg rounded-xl overflow-hidden">

        {/* Info panel */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-[#1e293b] p-6 md:w-1/2 flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-orange-400">Welcome Back!</h2>
          <p className="text-gray-300">
            “Your journey to a stronger, healthier you starts today.”
          </p>
        </motion.div>

        {/* Animated Login form */}
        <AnimatePresence>
          {!hideForm && (
            <motion.div
              key="login-form"
              initial={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
              className="bg-[#1e293b] p-8 md:w-1/2"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Log In to FitBuddy</h2>
              <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-2 rounded bg-[#334155] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="px-4 py-2 rounded bg-[#334155] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition duration-200"
                >
                  Log In
                </button>
              </form>
              <p className="text-center text-sm text-gray-400 mt-4">
                Don’t have an account? <a href="#" className="text-orange-400 hover:underline">Sign up</a>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginPage;