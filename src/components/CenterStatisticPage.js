import React, { useState, useEffect } from 'react';

const CenterStatisticPage = () => {
  const [centerStatistics, setCenterStatistics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCenterStatistics = async () => {
    setIsLoading(true);
    setError(null);

    const url = 'http://localhost:8080/api/statistics/centers';
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
      setCenterStatistics(data);
    } catch (error) {
      console.error('Error fetching center statistics:', error);
      setError('Error fetching center statistics. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCenterStatistics();
  }, []); // Fetch data on component mount

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Center Statistic Page</h1>

      {isLoading && <p className="text-gray-700">Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {centerStatistics.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {centerStatistics.map((centerStat) => (
            <div key={centerStat.center.id} className="bg-white p-6 rounded-md shadow-md">
              <h2 className="text-lg font-bold mb-4">{centerStat.center.name}</h2>
              <p className="text-gray-700 mb-2">
                <strong>Address:</strong> {centerStat.center.address}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Description:</strong> {centerStat.center.description}
              </p>
              <p className="text-blue-500">
                <strong>Fresher Count:</strong> {centerStat.countFresher}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CenterStatisticPage;
