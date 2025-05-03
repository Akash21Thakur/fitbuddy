import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiMessageCircle, FiBarChart2, FiActivity } from 'react-icons/fi'; // updated
import CheckInModal from '../components/CheckInModal';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("fitbuddyUserProfile");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const features = [
    {
      icon: <FiCheckCircle size={28} />,
      title: "Check-In",
      desc: "Mark today's workout",
      onClick: () => setShowCheckIn(true),
    },
    {
      icon: <FiBarChart2 size={28} />,
      title: "Progress",
      desc: "View your stats",
      onClick: () => navigate("/progress"),
    },
    {
      icon: <FiMessageCircle size={28} />,
      title: "Ask FitBuddy",
      desc: "Get AI motivation",
      onClick: () => navigate("/chat"),
    },
    {
      icon: <FiActivity size={28} />, // ✅ changed from FiSettings
      title: "Workout Plans",
      desc: "See your weekly plan",
      onClick: () => navigate("/plans"), // ✅ changed path
    },
  ];

  return (
    <div className="pt-20 min-h-screen bg-[#0f172a] text-white flex flex-col items-center p-6 space-y-8">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-3xl font-bold">Welcome back, {user?.name || "Athlete"} 👋</h1>
        <p className="text-orange-400 mt-2">🔥 Let's smash your goals today!</p>
        <p className="text-gray-400 mt-1 italic">“One step at a time, one rep at a time.”</p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {features.map((card, index) => (
          <motion.div
            key={index}
            onClick={card.onClick}
            className="bg-[#1e293b] p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <div className="flex items-center space-x-4">
              {card.icon}
              <div>
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="text-gray-400 text-sm">{card.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Nav (Mobile only) */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1e293b] p-4 flex justify-around md:hidden">
        <FiCheckCircle className="text-orange-400" size={24} />
        <FiBarChart2 className="text-gray-400" size={24} />
        <FiMessageCircle className="text-gray-400" size={24} />
        <FiActivity className="text-gray-400" size={24} /> {/* ✅ changed */}
      </div>

      <CheckInModal isOpen={showCheckIn} onClose={() => setShowCheckIn(false)} />
    </div>
  );
};

export default Dashboard;
