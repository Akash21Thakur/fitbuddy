
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DailyCheckIn = () => {
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const lastCheckIn = localStorage.getItem("fitbuddyLastCheckIn");
    const storedStreak = parseInt(localStorage.getItem("fitbuddyStreak") || "0", 10);
    const today = new Date().toDateString();

    if (lastCheckIn === today) {
      setCheckedInToday(true);
      setStreak(storedStreak);
    } else {
      setCheckedInToday(false);
      setStreak(storedStreak);
    }
  }, []);

  const handleCheckIn = () => {
    const today = new Date().toDateString();
    const lastCheckIn = localStorage.getItem("fitbuddyLastCheckIn");
    let newStreak = streak;

    if (lastCheckIn !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (lastCheckIn === yesterday) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }

      localStorage.setItem("fitbuddyLastCheckIn", today);
      localStorage.setItem("fitbuddyStreak", newStreak.toString());
      setCheckedInToday(true);
      setStreak(newStreak);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-6">
      <motion.div
        className="bg-[#1e293b] p-8 rounded-lg shadow-md max-w-md w-full text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-4">Daily Check-In ✅</h2>
        <p className="text-gray-400 mb-6">
          {checkedInToday
            ? "You’ve already checked in today. Great job! 💪"
            : "Don’t forget to check in and keep your streak going!"}
        </p>
        <p className="text-orange-400 text-lg mb-4">🔥 Streak: {streak} day{streak !== 1 ? "s" : ""}</p>

        {!checkedInToday && (
          <button
            onClick={handleCheckIn}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition duration-200"
          >
            Check In Now
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default DailyCheckIn;
