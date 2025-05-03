
import React, { useState } from "react";

const workoutData = {
  gain: {
    monday: {
      workout: ["Barbell Squats - 4x12", "Deadlifts - 3x10", "Lunges - 3x12"],
      meals: ["Oatmeal + Banana", "Chicken + Brown Rice", "Greek Yogurt + Nuts"],
    },
    tuesday: {
      workout: ["Bench Press - 4x10", "Push Ups - 3x15", "Shoulder Press - 3x12"],
      meals: ["Eggs + Toast", "Beef Stir Fry + Quinoa", "Protein Shake"]
    },
  },
};

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const WorkoutMealPlanPage = ({ goal = "gain" }) => {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
  const [selectedDay, setSelectedDay] = useState(today);

  const plan = workoutData[goal]?.[selectedDay];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-4 text-orange-400">🏋️ Workout & 🍱 Meal Plan</h1>

      <div className="flex justify-center gap-2 flex-wrap mb-6">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`capitalize px-4 py-2 rounded-full border transition duration-200 text-sm ${
              selectedDay === day
                ? "bg-orange-500 text-white"
                : "border-orange-400 text-orange-300 hover:bg-orange-500 hover:text-white"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {plan ? (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1e293b] rounded-xl p-6 shadow">
            <h2 className="text-xl font-semibold text-orange-400 mb-2">💪 Workout</h2>
            <ul className="list-disc list-inside space-y-1">
              {plan.workout.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-[#1e293b] rounded-xl p-6 shadow">
            <h2 className="text-xl font-semibold text-orange-400 mb-2">🍽️ Meals</h2>
            <ul className="list-disc list-inside space-y-1">
              {plan.meals.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-10">No plan available for {selectedDay}</p>
      )}
    </div>
  );
};

export default WorkoutMealPlanPage;
