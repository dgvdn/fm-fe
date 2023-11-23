// UpdateFresher.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateFresher = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const programmingLanguages = [
        'JavaScript',
        'Python',
        'Java',
        'C#',
        'C++',
        'TypeScript',
        'Ruby',
        'Swift',
        'Kotlin',
        'Go',
        'Rust',
        // Add more languages as needed
    ];
    
    const statusOptions = ['ACTIVE', 'INACTIVE', 'GRADUATED'];

    const [fresher, setFresher] = useState({
        name: '',
        center: '',
        language: '',
        address: '',
        email: '',
        phone: '',
        status: '',
    });

    useEffect(() => {
        const fetchfresher = async () => {
            const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await fetch(`http://localhost:8080/api/freshers/${id}`, {
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
                setFresher(data);
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        };

        fetchfresher();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFresher((prevFresher) => ({
            ...prevFresher,
            [name]: value,
        }));
    };

    const [centers, setCenters] = useState([]);

    // Fetch centers from the API when the component mounts
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        fetch('http://localhost:8080/api/centers', {
            method: 'GET', // Explicitly stating the HTTP method
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
            .then(response => response.json())
            .then(data => setCenters(data))
            .catch(error => {
                console.error('Error fetching centers:', error);
            });
    }, []);

    const handleUpdateFresher = async () => {


        // Prepare the data payload, initially without the center field
        let payload = {
            name: fresher.name,
            language: fresher.language,
            address: fresher.address,
            email: fresher.email,
            phone: fresher.phone,
            status: fresher.status, // Include the status field in the payload
        };

        // Conditionally add the center field only if a center is selected
        if (fresher.center) {
            payload = {
                ...payload,
                center: { id: parseInt(fresher.center) }
            };
        }

        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await fetch(`http://localhost:8080/api/freshers/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Redirect to the Fresher Management page or any other appropriate page
            navigate('/fresher-management');
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Update Fresher</h1>
            <form>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-600 font-medium">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full p-2 border rounded-md"
                        value={fresher.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="center" className="block text-gray-600 font-medium">
                        Center Name
                    </label>
                    <select
                        id="center"
                        name="center"
                        className="w-full p-2 border rounded-md"
                        value={fresher.center?.id || ''}
                        onChange={handleInputChange}
                    >
                        <option value="">No Center</option>
                        {centers.map((center) => (
                            <option key={center?.id} value={center?.id}>
                                {center?.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="language" className="block text-gray-600 font-medium">
                        Programming Language
                    </label>
                    <select
                        id="language"
                        name="language"
                        className="w-full p-2 border rounded-md"
                        value={fresher.language}
                        onChange={handleInputChange}
                    >
                        <option value="">Select a language</option>
                        {programmingLanguages.map((language) => (
                            <option key={language} value={language}>
                                {language}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-600 font-medium">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        className="w-full p-2 border rounded-md"
                        value={fresher.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-600 font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full p-2 border rounded-md"
                        value={fresher.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-600 font-medium">
                        Phone
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full p-2 border rounded-md"
                        value={fresher.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="status" className="block text-gray-600 font-medium">
                        Status
                    </label>
                    <select
                        id="status"
                        name="status"
                        className="w-full p-2 border rounded-md"
                        value={fresher.status}
                        onChange={handleInputChange}
                    >
                        <option value="">Select a status</option>
                        {statusOptions.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="button"
                    onClick={handleUpdateFresher}
                    className="w-full bg-blue-500 text-white p-2 rounded-md"
                >
                    Update Fresher
                </button>
            </form>
        </div>
    );
};

export default UpdateFresher;
