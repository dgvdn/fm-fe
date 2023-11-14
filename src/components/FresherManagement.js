import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FresherManagement = () => {
    const [freshers, setFreshers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const [filteredLanguage, setFilteredLanguage] = useState(''); // Filtered language state
    const navigate = useNavigate();

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

    const handleAddFresher = () => {
        navigate('/add-fresher');
    };

    const handleUpdateFresher = (fresherId) => {
        // Navigate to the UpdateFresher component with the fresher ID
        navigate(`/fresher-management/update/${fresherId}`);
    };

    const handleDeleteFresher = async (fresherId) => {
        try {
            const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token from localStorage
            const response = await fetch(`http://localhost:8080/api/freshers/delete/${fresherId}`, {
                method: 'DELETE', // Explicitly stating the HTTP method
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // remove the deleted fresher from the freshers state
            const updatedFreshers = freshers.filter((fresher) => fresher.id !== fresherId);
            setFreshers(updatedFreshers);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    // Filter freshers by name
    const filteredFreshers = freshers.filter((fresher) => {
        const nameMatch = fresher.name.toLowerCase().includes(searchTerm.toLowerCase());
        const languageMatch = !filteredLanguage || fresher.language === filteredLanguage;
        return nameMatch && languageMatch;
    });

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Fresher Management</h1>
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by name"
                    className="border border-gray-300 p-2 rounded-lg mr-2"
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <select
                    className="border border-gray-300 p-2 rounded-lg mr-2"
                    value={filteredLanguage}
                    onChange={(event) => setFilteredLanguage(event.target.value)}
                >
                    <option value="">All Languages</option>
                    {/* Add options for each programming language */}
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="C#">C#</option>
                    <option value="C++">C++</option>
                    <option value="PHP">PHP</option>
                    <option value="Ruby">Ruby</option>
                    <option value="Go">Go</option>
                    <option value="TypeScript">TypeScript</option>
                    <option value="Swift">Swift</option>
                    <option value="Kotlin">Kotlin</option>
                    <option value="Rust">Rust</option>
                </select>
                <button
                    className="bg-blue-500 text-white p-2 rounded-md"
                    onClick={handleAddFresher}
                >
                    Add Fresher
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="w-1/6 py-2 px-4 border">Name</th>
                            <th className="w-1/6 py-2 px-4 border">Center Name</th>
                            <th className="w-1/6 py-2 px-4 border">Language</th>
                            <th className="w-1/6 py-2 px-4 border">Address</th>
                            <th className="w-1/6 py-2 px-4 border">Email</th>
                            <th className="w-1/6 py-2 px-4 border">Phone</th>
                            <th className="w-1/6 py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {filteredFreshers.map((fresher) => (
                            <tr key={fresher.id}>
                                <td className="border px-4 py-2">{fresher?.name}</td>
                                <td className="border px-4 py-2">{fresher?.center?.name}</td>
                                <td className="border px-4 py-2">{fresher?.language || 'N/A'}</td>
                                <td className="border px-4 py-2">{fresher?.address || 'N/A'}</td>
                                <td className="border px-4 py-2">{fresher?.email || 'N/A'}</td>
                                <td className="border px-4 py-2">{fresher?.phone}</td>
                                <td className="border px-4 py-2 flex space-x-2">
                                    <button
                                        className="bg-yellow-500 text-white p-2 rounded-md"
                                        onClick={() => handleUpdateFresher(fresher.id)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="bg-red-500 text-white p-2 rounded-md"
                                        onClick={() => handleDeleteFresher(fresher.id)}
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

    );
};

export default FresherManagement;
