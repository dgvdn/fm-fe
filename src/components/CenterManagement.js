import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CenterManagement = () => {
    const [centers, setCenters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token from localStorage

            try {
                const response = await fetch('http://localhost:8080/api/centers', {
                    method: 'GET', // Explicitly stating the HTTP method
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCenters(data);
            }
            catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        }
        fetchData();
    }, []);
    const handleAddCenter = () => {
        navigate('/add-center');
    };
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Center Management</h1>
            <div className="flex items-center mb-4">
                <button
                    className="bg-blue-500 text-white p-2 rounded-md"
                    onClick={handleAddCenter}
                >
                    Add Center
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="w-1/6 py-2 px-4 border">Name</th>
                            <th className="w-1/6 py-2 px-4 border">Address</th>
                            <th className="w-1/6 py-2 px-4 border">Description</th>
                            <th className="w-1/6 py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {centers.map((center) => (
                            <tr key={center.id}>
                                <td className="border px-4 py-2">{center?.name}</td>
                                <td className="border px-4 py-2">{center?.address}</td>
                                <td className="border px-4 py-2">{center?.description || 'N/A'}</td>
                                <td className="border px-4 py-2 flex space-x-2">
                                    <button
                                        className="bg-yellow-500 text-white p-2 rounded-md"

                                    >
                                        Update
                                    </button>
                                    <button
                                        className="bg-red-500 text-white p-2 rounded-md"

                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CenterManagement