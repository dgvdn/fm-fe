import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MarkManagement = () => {
  const [freshers, setFreshers] = useState([]);
  const [centerIdMapping, setCenterIdMapping] = useState({});
  const [quarter, setQuarter] = useState('');
  const [year, setYear] = useState('');
  const [center, setCenter] = useState([]);
  const [filteredCenter, setFilteredCenter] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');

      try {
        const response = await fetch('http://localhost:8080/api/freshers/withMarksAndQuarter', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setFreshers(data);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      fetch('http://localhost:8080/api/centers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      })
        .then(response => response.json())
        .then(data => setCenter(data))
        .catch(error => {
          console.error('Error fetching centers:', error);
        })
      const centerData = center;
      const mapping = {};
      centerData.forEach(center => {
        mapping[center.name] = center.id;
      });
      setCenterIdMapping(mapping);
    }

    fetchData();
  }, []);

  const filteredFreshers = freshers.filter((fresher) => {
    const centerMatch = !filteredCenter || fresher.centerName === filteredCenter;
    const quarterMatch = !quarter || fresher.quarterYear.startsWith(`Q${quarter}`);
    const yearMatch = !year || fresher.quarterYear.endsWith(year);
    return centerMatch && quarterMatch && yearMatch;
  });

  const handleViewButtonClick = (id) => {
    navigate(`/mark-management/${id}`);
  }



  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Fresher Management</h1>
      <div className="flex items-center mb-4">
        <select
          className="border border-gray-300 p-2 rounded-lg mr-2"
          value={filteredCenter}
          onChange={(event) => setFilteredCenter(event.target.value)}
        >
          <option value="">All Centers</option>
          {center?.map((center) => (
            <option key={center?.id} value={center?.name}>
              {center?.name}
            </option>
          ))}
        </select>
        <select
          className="border border-gray-300 p-2 rounded-lg mr-2"
          value={quarter}
          onChange={(event) => setQuarter(event.target.value)}
        >
          <option value="">Select Quarter</option>
          <option value="1">Q1</option>
          <option value="2">Q2</option>
          <option value="3">Q3</option>
          <option value="4">Q4</option>
        </select>
        <select
          className="border border-gray-300 p-2 rounded-lg mr-2"
          value={year}
          onChange={(event) => setYear(event.target.value)}
        >
          <option value="">Select Year</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/6 py-2 px-4 border">Name</th>
                <th className='w-1/6 py-2 px-4 border'>Center</th>
                <th className="w-1/6 py-2 px-4 border">Mark 1</th>
                <th className="w-1/6 py-2 px-4 border">Mark 2</th>
                <th className="w-1/6 py-2 px-4 border">Mark 3</th>
                <th className="w-1/6 py-2 px-4 border">Avarage</th>
                <th className="w-1/6 py-2 px-4 border">Period</th>
                <th className="w-1/6 py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredFreshers.map((fresher) => (
                <tr key={fresher.id}>
                  <td className="border px-4 py-2">{fresher?.name}</td>
                  <td className="border px-4 py-2">{fresher?.centerName}</td>
                  <td className="border px-4 py-2">{fresher?.mark1 !== -1 ? fresher?.mark1 : null}</td>
                  <td className="border px-4 py-2">{fresher?.mark2 !== -1 ? fresher?.mark2 : null}</td>
                  <td className="border px-4 py-2">{fresher?.mark3 !== -1 ? fresher?.mark3 : null}</td>
                  <td className="border px-4 py-2">{fresher?.markAvg !== -1 ? fresher?.markAvg : null}</td>
                  <td className="border px-4 py-2">{fresher?.quarterYear}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleViewButtonClick(fresher.id)} // You need to implement handleViewButtonClick
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MarkManagement;
