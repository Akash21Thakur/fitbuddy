import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiUser,
  FiBarChart2,
  FiMessageCircle,
  FiActivity,
} from 'react-icons/fi';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: <FiBarChart2 size={20} /> },
  { to: '/chat', label: 'AI Chat', icon: <FiMessageCircle size={20} /> },
  { to: '/plans', label: 'Workout Plans', icon: <FiActivity size={20} /> },
  { to: '/profile', label: 'Profile', icon: <FiUser size={20} /> }, // ✅ Added Profile
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-[#1e293b] px-4 py-3 shadow-md fixed top-0 w-full z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-lg font-bold text-orange-400">FitBuddy</h1>
        <ul className="hidden md:flex space-x-6 text-sm">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`flex items-center space-x-1 hover:text-orange-400 transition ${
                  location.pathname === link.to
                    ? 'text-orange-500 font-semibold'
                    : 'text-white'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
