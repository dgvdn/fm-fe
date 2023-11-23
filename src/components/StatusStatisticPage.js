import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StatusStatisticPage = () => {
  const [statusStatistics, setStatusStatistics] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStatusStatistics = async () => {
    setIsLoading(true);
    setError(null);

    const url = 'http://localhost:8080/api/statistics/status';
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setStatusStatistics(data);
    } catch (error) {
      console.error('Error fetching status statistics:', error);
      setError('Error fetching status statistics. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatusStatistics();
  }, []);

  // Define colors for each status
  const statusColors = {
    ACTIVE: 'bg-green-200',
    INACTIVE: 'bg-red-200',
    GRADUATED: 'bg-blue-200',
    // Add more colors for other statuses as needed
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Status Statistic Page</h1>

      {isLoading && (
        <div className="text-center">
          <p className="text-gray-700">Loading...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">
          {error}
        </div>
      )}

      {!isLoading && Object.keys(statusStatistics).length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(statusStatistics).map(([status, count]) => (
            <Link key={status} to={`/fresher-list/${status}`} className="text-black">
              <div className={`p-6 rounded-md shadow-md cursor-pointer ${statusColors[status]}`}>
                <h2 className="text-lg font-bold mb-2">{status}</h2>
                <p className="text-gray-700">
                  Count: <strong>{count}</strong>
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusStatisticPage;
