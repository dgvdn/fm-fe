import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AddCenter = () => {
    const navigate = useNavigate();
    const [center, setCenter] = useState({
        name: '',
        address: '',
        description: '',
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCenter({ ...center, [name]: value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const accessToken = localStorage.getItem('accessToken');
        const data = {
            name: center.name,
            address: center.address,
            description: center.description,
        };
        fetch('http://localhost:8080/api/centers', {
            method: 'POST', // Explicitly stating the HTTP method
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Redirect the user to the fresher list
                navigate('/center-management');
            }
            )
            .catch(error => {
                console.error('Error:', error);
            });
    }

  return (
    <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Add Center</h1>
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
                    Add Center
                </button>
            </form>
        </div>
  )
}

export default AddCenter