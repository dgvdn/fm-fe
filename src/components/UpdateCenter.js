import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';  

const UpdateCenter = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [center, setCenter] = useState({
        name: '',
        address: '',
        description: '',
    });

    useEffect(() => {
        const fetchCenter = async () => {
            const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await fetch(`http://localhost:8080/api/centers/${id}`, {
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
                setCenter(data);
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        }
        fetchCenter();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCenter((prevCenter) => ({
            ...prevCenter,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('accessToken');
        fetch(`http://localhost:8080/api/centers/${id}`, {
            method: 'PUT', // Explicitly stating the HTTP method
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(center),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                navigate('/center-management');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

  return (
    <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Update Center</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-600 font-medium">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full p-2 border rounded-md"
                        value={center.name}
                        onChange={handleInputChange}
                    />
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
                        value={center.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-600 font-medium">
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        className="w-full p-2 border rounded-md"
                        value={center.description}
                        onChange={handleInputChange}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md"
                >
                    Update Center
                </button>
            </form>
        </div>
  )
}

export default UpdateCenter