import React, { useState, useEffect } from 'react';

const MarkStatisticPage = () => {
  const [minMark, setMinMark] = useState(70);
  const [maxMark, setMaxMark] = useState(80);
  const [fresherCount, setFresherCount] = useState(null);

  const fetchFresherCount = async () => {
    const url = `http://localhost:8080/api/statistics/marks?minMark=${minMark}&maxMark=${maxMark}`;
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
      setFresherCount(data.fresherCount);
    } catch (error) {
      console.error('Error fetching fresher count:', error);
    }
  };

  useEffect(() => {
    fetchFresherCount();
  }, [minMark, maxMark]); // Fetch data whenever minMark or maxMark changes

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Mark Statistic Page</h1>
      <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
        <label htmlFor="minMark" className="block text-sm font-medium text-gray-600">
          Min Mark:
        </label>
        <input
          type="number"
          id="minMark"
          className="mt-1 p-2 border rounded-md w-full"
          value={minMark}
          onChange={(e) => setMinMark(e.target.value)}
        />

        <label htmlFor="maxMark" className="block mt-4 text-sm font-medium text-gray-600">
          Max Mark:
        </label>
        <input
          type="number"
          id="maxMark"
          className="mt-1 p-2 border rounded-md w-full"
          value={maxMark}
          onChange={(e) => setMaxMark(e.target.value)}
        />

        <button
          className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={fetchFresherCount}
        >
          Get Fresher Count
        </button>

        {fresherCount !== null && (
          <div className="mt-8">
            <h2 className="text-lg font-bold">Fresher Count:</h2>
            <p className="mt-2 text-xl text-gray-800">{fresherCount}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkStatisticPage;
