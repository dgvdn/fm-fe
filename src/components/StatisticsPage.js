import React from 'react';
import { Link } from 'react-router-dom';

const StatisticsPage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Statistics Page</h1>
      <div className="flex space-x-4">
        <Link to="/mark-statistic">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300">
            Mark Statistics
          </button>
        </Link>
        <Link to="/center-statistic">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300">
            Center Statistics
          </button>
        </Link>
        <Link to="/status-statistic">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition duration-300">
            Status Statistics
          </button>
        </Link>
        <Link to="/language-statistic">
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition duration-300">
            Language Statistics
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StatisticsPage;
