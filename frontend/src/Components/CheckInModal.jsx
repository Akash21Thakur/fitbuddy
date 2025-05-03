
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CheckInModal = ({ isOpen, onClose }) => {
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#1e293b] p-6 rounded-lg w-full max-w-md text-white text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-3">Daily Check-In ✅</h2>
            <p className="text-gray-400 mb-4">
              {checkedInToday
                ? "You've already checked in today. Keep it up! 💪"
                : "Ready to check in and keep that streak alive?"}
            </p>
            <p className="text-orange-400 text-lg mb-4">🔥 Streak: {streak} day{streak !== 1 ? "s" : ""}</p>

            {!checkedInToday && (
              <button
                onClick={handleCheckIn}
                className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-full font-semibold mb-4"
              >
                Check In Now
              </button>
            )}

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-sm"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckInModal;
