import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20 min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 bg-[#0f172a] text-white">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
      >
        Your AI Fitness <br />
        <span className="text-orange-500">Buddy</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg text-gray-400 mb-8 max-w-xl"
      >
        Achieve your fitness goals with personalized workout and nutrition guidance.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/login')}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-lg transition-all duration-200"
      >
        Get Started
      </motion.button>
    </div>
  );
};

export default LandingPage;
