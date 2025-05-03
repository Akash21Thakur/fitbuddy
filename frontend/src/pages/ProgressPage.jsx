
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FiTrendingUp, FiAward, FiActivity } from "react-icons/fi";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const checkInData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Check-ins",
      data: [1, 1, 0, 1, 1, 1, 0], // mock data
      borderColor: "#f97316",
      backgroundColor: "rgba(249, 115, 22, 0.1)",
      tension: 0.4,
      fill: true,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { stepSize: 1 },
    },
  },
};

const ProgressPage = () => {
  return (
    <div className="min-h-screen pt-20 px-6 pb-10 bg-[#0f172a] text-white">
      <div className="max-w-5xl mx-auto space-y-8">

        <div className="text-center">
          <h1 className="text-3xl font-bold text-orange-400">📈 Your Progress</h1>
          <p className="text-gray-400 mt-1 italic">Track your fitness streaks and milestones</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-[#1e293b] p-6 rounded-xl shadow-md">
            <FiActivity size={32} className="mx-auto text-orange-400" />
            <h2 className="text-xl font-bold mt-2">Current Streak</h2>
            <p className="text-2xl text-green-400 mt-1">🔥 5 days</p>
          </div>
          <div className="bg-[#1e293b] p-6 rounded-xl shadow-md">
            <FiAward size={32} className="mx-auto text-orange-400" />
            <h2 className="text-xl font-bold mt-2">Best Streak</h2>
            <p className="text-2xl text-blue-400 mt-1">🏆 10 days</p>
          </div>
          <div className="bg-[#1e293b] p-6 rounded-xl shadow-md">
            <FiTrendingUp size={32} className="mx-auto text-orange-400" />
            <h2 className="text-xl font-bold mt-2">Check-ins This Month</h2>
            <p className="text-2xl text-yellow-400 mt-1">✅ 17</p>
          </div>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-orange-400 mb-3">📊 Weekly Check-In Trend</h3>
          <Line data={checkInData} options={chartOptions} />
        </div>

        <div className="bg-[#1e293b] p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-orange-400 mb-2">💡 FitBuddy Tip</h3>
          <p className="italic text-gray-300">
            “Great consistency! Small steps every day turn into big results.”
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
