
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-20 px-4 pb-10 min-h-screen bg-[#0f172a] text-white overflow-x-hidden">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
