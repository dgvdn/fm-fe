import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FresherListByStatus = () => {
    const [freshers, setFreshers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { status } = useParams();
    const [quarter, setQuarter] = useState('');
    const [year, setYear] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await fetch(`http://localhost:8080/api/statistics/status/${status}`, {
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
                setError('There has been a problem with your fetch operation. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [status]);

    const filteredFreshers = freshers.filter((fresher) => {
        const quarterMatch = !quarter || fresher.quarterYear.startsWith(`Q${quarter}`);
        const yearMatch = !year || fresher.quarterYear.endsWith(year);
        return quarterMatch && yearMatch;
    });

    const goBack = () => {
        window.history.back();
    };

    // status text color
    const statusTextColors = {
        ACTIVE: 'text-green-500',
        INACTIVE: 'text-red-500',
        GRADUATED: 'text-blue-500',
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Fresher Management</h1>
            <div className="flex items-center mb-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2" onClick={goBack}>
                    Go Back
                </button>
                <div className="flex">
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
                        className="border border-gray-300 p-2 rounded-lg"
                        value={year}
                        onChange={(event) => setYear(event.target.value)}
                    >
                        <option value="">Select Year</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                    </select>
                </div>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="w-1/6 py-2 px-4 border">Name</th>
                                <th className="w-1/6 py-2 px-4 border">Center</th>
                                <th className="w-1/6 py-2 px-4 border">Status</th>
                                <th className="w-1/6 py-2 px-4 border">Period</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {filteredFreshers.map((fresher) => (
                                <tr key={fresher.id}>
                                    <td className="border px-4 py-2">{fresher?.name}</td>
                                    <td className="border px-4 py-2">{fresher?.centerName}</td>
                                    <td className={`border px-4 py-2 ${statusTextColors[fresher?.status]}`}>
                                        {fresher?.status}
                                    </td>
                                    <td className="border px-4 py-2">{fresher?.quarterYear}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default FresherListByStatus;
