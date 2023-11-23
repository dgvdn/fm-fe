import React, { useState, useEffect } from 'react';

const MarkStatisticPage = () => {
  const [markStatistics, setMarkStatistics] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [freshersList, setFreshersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMarkStatistics = async () => {
    setIsLoading(true);
    setError(null);

    const url = 'http://localhost:8080/api/statistics/marks';
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
      setMarkStatistics(data);
    } catch (error) {
      console.error('Error fetching mark statistics:', error);
      setError('Error fetching mark statistics. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarkStatistics();
  }, []);

  const handleGridItemClick = async (category) => {
    // Set the selected category
    setSelectedCategory(category);

    // Fetch the list of freshers for the selected category
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:8080/api/statistics/marks/${category}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const freshersData = await response.json();
      setFreshersList(freshersData);
    } catch (error) {
      console.error(`Error fetching freshers for category ${category}:`, error);
      setError(`Error fetching freshers for category ${category}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Mark Statistic Page</h1>

      {isLoading && <p className="text-gray-700">Loading...</p>}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {Object.keys(markStatistics).length > 0 && (
        <div className="grid grid-cols-3 gap-8">
          {/* Mark Statistics */}
          {Object.entries(markStatistics).map(([category, count]) => (
            <div
              key={category}
              className={`bg-white p-6 rounded-md shadow-md cursor-pointer ${selectedCategory === category ? 'border border-blue-500' : ''
                }`}
              onClick={() => handleGridItemClick(category)}
            >
              <h2 className="text-lg font-bold mb-4">{category}</h2>
              <p className="text-gray-700">
                <strong>Count:</strong> {count}
                <br />
                {getMarkRangeDescription(category)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Display Freshers List in Table */}
      {selectedCategory && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Freshers in {selectedCategory} Range</h2>
          {isLoading && <p className="text-gray-700">Loading...</p>}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
              <strong>Error:</strong> {error}
            </div>
          )}
          {freshersList.length > 0 && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Center
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mark 1
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mark 2
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mark 3
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Average Mark
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                </tr>
              </thead>
              <tbody>
                {freshersList.map((fresher) => (
                  <tr key={fresher.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fresher.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fresher.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fresher.centerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fresher.mark1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fresher.mark2}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fresher.mark3}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fresher.markAvg}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fresher.quarterYear}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );

  function getMarkRangeDescription(category) {
    // Define your mark ranges based on the category
    switch (category) {
      case 'Unsatisfactory':
        return 'Mark range: Less than 50';
      case 'Needs Improvement':
        return 'Mark range: 50 - 59';
      case 'Satisfactory':
        return 'Mark range: 60 - 69';
      case 'Good':
        return 'Mark range: 70 - 79';
      case 'Excellent':
        return 'Mark range: 80 - 89';
      case 'Outstanding':
        return 'Mark range: 90 and above';
      default:
        return '';
    }
  }

};

export default MarkStatisticPage;
