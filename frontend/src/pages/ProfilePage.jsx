
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const isProfileComplete = (data) => {
  return data.name && data.age && data.gender && data.height && data.weight && data.goal;
};

const generateTodayPlan = (goal) => {
  switch (goal?.toLowerCase()) {
    case "gain":
      return { workout: "🏋️ Strength Upper Body", meal: "2200 kcal | High Protein" };
    case "lose":
      return { workout: "🏃‍♂️ Cardio + Core", meal: "1500 kcal | Low Carb" };
    default:
      return { workout: "🧘 Full Body Stretch", meal: "1800 kcal | Balanced" };
  }
};

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    goal: "",
    image: "",
  });
  const [bmi, setBmi] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);

  const todayPlan = generateTodayPlan(formData.goal);

  useEffect(() => {
    const saved = localStorage.getItem("fitbuddyUserProfile");
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(parsed);
      calculateBMI(parsed.height, parsed.weight);
      if (!isProfileComplete(parsed)) setShowSetupModal(true);
    } else {
      setShowSetupModal(true);
    }
  }, []);

  const calculateBMI = (h, w) => {
    if (h && w) {
      const bmiVal = (parseFloat(w) / ((parseFloat(h) / 100) ** 2)).toFixed(1);
      setBmi(bmiVal);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const reader = new FileReader();
      reader.onload = () => setFormData({ ...formData, image: reader.result });
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = () => {
    localStorage.setItem("fitbuddyUserProfile", JSON.stringify(formData));
    calculateBMI(formData.height, formData.weight);
    setShowEdit(false);
    setShowSetupModal(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 space-y-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Left - Profile */}
        <div className="bg-[#1e293b] p-6 rounded-xl shadow-lg flex flex-col items-center">
          {formData.image ? (
            <img src={formData.image} alt="Profile" className="w-24 h-24 rounded-full border-2 border-orange-400" />
          ) : (
            <div className="w-24 h-24 bg-gray-600 rounded-full" />
          )}
          <h2 className="mt-3 text-xl font-bold">{formData.name || "User"}</h2>
          <p className="text-sm text-gray-400 mb-2">{formData.goal || "No goal set"}</p>
          <button
            onClick={() => setShowEdit(true)}
            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-sm mt-2"
          >
            Edit Profile
          </button>
          <div className="mt-6 w-full space-y-1 text-sm">
            <p><strong>Age:</strong> {formData.age}</p>
            <p><strong>Gender:</strong> {formData.gender}</p>
            <p><strong>Height:</strong> {formData.height} cm</p>
            <p><strong>Weight:</strong> {formData.weight} kg</p>
            <p><strong>BMI:</strong> {bmi}</p>
          </div>
        </div>

        {/* Center - Stats */}
        <div className="md:col-span-2 grid gap-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-[#1e293b] p-4 rounded-xl text-center">
              <h3 className="text-orange-400 font-semibold">BMI</h3>
              <p className="text-xl mt-1">{bmi || "--"}</p>
            </div>
            <div className="bg-[#1e293b] p-4 rounded-xl text-center">
              <h3 className="text-orange-400 font-semibold">Goal</h3>
              <p className="text-xl mt-1">{formData.goal || "--"}</p>
            </div>
            <div className="bg-[#1e293b] p-4 rounded-xl text-center">
              <h3 className="text-orange-400 font-semibold">🔥 Streak</h3>
              <p className="text-xl mt-1">7 days</p>
            </div>
          </div>

          {/* Today Plan */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-[#1e293b] p-4 rounded-xl">
              <h4 className="text-orange-400 font-semibold mb-1">Today’s Workout</h4>
              <p>{todayPlan.workout}</p>
            </div>
            <div className="bg-[#1e293b] p-4 rounded-xl">
              <h4 className="text-orange-400 font-semibold mb-1">Meal Plan</h4>
              <p>{todayPlan.meal}</p>
            </div>
          </div>

          {/* Achievements + Insight */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-[#1e293b] p-4 rounded-xl">
              <h4 className="text-orange-400 font-semibold mb-1">🏆 Achievements</h4>
              <ul className="space-y-1 text-sm mt-2">
                <li className="text-green-400">🔥 3-Day Streak</li>
                <li className="text-blue-400">🎯 Goal Setter</li>
                <li className="text-pink-400">💪 First Check-In</li>
              </ul>
            </div>
            <div className="bg-[#1e293b] p-4 rounded-xl">
              <h4 className="text-orange-400 font-semibold mb-1">💡 FitBuddy Insight</h4>
              <p className="italic text-sm text-gray-300 mt-2">
                “You're stronger than you think. Keep pushing your limits!”
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Side Panel */}
      <AnimatePresence>
        {showEdit && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-[#1e293b] p-6 z-50 overflow-y-auto shadow-lg"
          >
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            {["name", "age", "gender", "height", "weight", "goal"].map((field) => (
              <div key={field} className="mb-3">
                <label className="block text-sm capitalize">{field}</label>
                <input
                  type={["age", "height", "weight"].includes(field) ? "number" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full bg-[#0f172a] text-white p-2 rounded border border-gray-600"
                />
              </div>
            ))}
            <div className="mb-4">
              <label className="block text-sm">Profile Picture</label>
              <input type="file" name="image" accept="image/*" onChange={handleChange} />
            </div>
            <div className="flex justify-between">
              <button onClick={handleSave} className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">
                Save
              </button>
              <button onClick={() => setShowEdit(false)} className="text-gray-300 hover:text-white">
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
