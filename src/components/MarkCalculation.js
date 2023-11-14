import React, { useState } from 'react';

const MarkCalculation = () => {
  const [fresherId, setFresherId] = useState('');
  const [mark1, setMark1] = useState('');
  const [mark2, setMark2] = useState('');
  const [mark3, setMark3] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const url = 'http://localhost:8080/api/marks/calculate';

    const data = {
      fresherId: fresherId,
      mark1: mark1,
      mark2: mark2,
      mark3: mark3,
    };

    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const result = await response.json();
      setResult(result);
    } catch (error) {
      setResult(null);
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Mark Calculation Page</h1>
      <div className="max-w-xs mx-auto">
        <label htmlFor="fresherId" className="block text-sm font-medium text-gray-600">
          Fresher ID:
        </label>
        <input
          type="text"
          id="fresherId"
          className="mt-1 p-2 border rounded-md w-full"
          value={fresherId}
          onChange={(e) => setFresherId(e.target.value)}
        />

        <label htmlFor="mark1" className="block mt-4 text-sm font-medium text-gray-600">
          Mark 1:
        </label>
        <input
          type="text"
          id="mark1"
          className="mt-1 p-2 border rounded-md w-full"
          value={mark1}
          onChange={(e) => setMark1(e.target.value)}
        />

        <label htmlFor="mark2" className="block mt-4 text-sm font-medium text-gray-600">
          Mark 2:
        </label>
        <input
          type="text"
          id="mark2"
          className="mt-1 p-2 border rounded-md w-full"
          value={mark2}
          onChange={(e) => setMark2(e.target.value)}
        />

        <label htmlFor="mark3" className="block mt-4 text-sm font-medium text-gray-600">
          Mark 3:
        </label>
        <input
          type="text"
          id="mark3"
          className="mt-1 p-2 border rounded-md w-full"
          value={mark3}
          onChange={(e) => setMark3(e.target.value)}
        />

        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition duration-300"
          onClick={handleSubmit}
        >
          Calculate Marks
        </button>

        {result !== null && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">Result:</h2>
            <p className="text-gray-800">Average Mark: {result?.averageMark}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkCalculation;
