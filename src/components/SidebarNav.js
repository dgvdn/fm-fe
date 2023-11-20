import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SidebarNav = () => {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('accessToken'));

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <nav className="flex flex-col h-full min-h-screen w-64 bg-gray-800 text-white">
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-center h-20 shadow-md">
          <h1 className="text-3xl uppercase">Logo</h1>
        </div>
        <ul className="flex flex-col flex-1 py-4 overflow-y-auto">
          <li>
            <Link to="/dashboard" className="flex items-center p-4 hover:bg-gray-700 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <span className="ml-4">Dashboard</span>
            </Link>
          </li>
          {/* Insert the new link for Fresher Management here */}
          <li>
            <Link to="/fresher-management" className="flex items-center p-4 hover:bg-gray-700 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <span className="ml-4">Fresher Management</span>
            </Link>
          </li>
          <li>
            <Link to="/center-management" className="flex items-center p-4 hover:bg-gray-700 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <span className="ml-4">Center Management</span>
            </Link>
          </li>
          <li>
            <Link to={`/mark-management`} className="flex items-center p-4 hover:bg-gray-700 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <span className="ml-4">Mark Management</span>
            </Link>
          </li>
          <li>
            <Link to={`/statistics`} className="flex items-center p-4 hover:bg-gray-700 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <span className="ml-4">Statistics</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="mb-4 mx-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            aria-label="Logout"
            className="w-full flex items-center justify-center p-4 hover:bg-gray-700 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/"
            aria-label="Login"
            className="w-full flex items-center justify-center p-4 hover:bg-gray-700 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default SidebarNav;
