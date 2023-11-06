import React, { useState, useEffect } from 'react';

const FresherManagement = () => {
    const [freshers, setFreshers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token from localStorage

            try {
                const response = await fetch('http://localhost:8080/api/freshers', {
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
                setFreshers(data);
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Fresher Management</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="w-1/6 py-2">Name</th>
                            <th className="w-1/6 py-2">Center Name</th>
                            <th className="w-1/6 py-2">Language</th>
                            <th className="w-1/6 py-2">Address</th>
                            <th className="w-1/6 py-2">Email</th>
                            <th className="w-1/6 py-2">Phone</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {freshers.map((fresher) => (
                            <tr key={fresher.id}>
                                <td className="border px-4 py-2">{fresher?.name}</td>
                                <td className="border px-4 py-2">{fresher?.center?.name}</td>
                                <td className="border px-4 py-2">{fresher?.language || 'N/A'}</td>
                                <td className="border px-4 py-2">{fresher?.address || 'N/A'}</td>
                                <td className="border px-4 py-2">{fresher?.email || 'N/A'}</td>
                                <td className="border px-4 py-2">{fresher?.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FresherManagement;
