import React, { useState, useEffect } from 'react';

function AddFresher() {
    // State to store fresher details
    const [fresherData, setFresherData] = useState({
        name: '',
        center: null,
        language: '',
        address: '',
        email: '',
        phone: '',
    });

    // State to store the list of centers
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


    // Event handler to update the state when input fields change
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFresherData({ ...fresherData, [name]: value });
    };

    // ...

    // Event handler for submitting the form
    // Event handler for submitting the form
    const handleSubmit = (event) => {
        event.preventDefault();

        // Prepare the data payload, initially without the center field
        let payload = {
            name: fresherData.name,
            language: fresherData.language,
            address: fresherData.address,
            email: fresherData.email,
            phone: fresherData.phone
        };

        // Conditionally add the center field only if a center is selected
        if (fresherData.center) {
            payload = {
                ...payload,
                center: { id: parseInt(fresherData.center) }
            };
        }

        // Fetch the access token from local storage (if your API requires authentication)
        const accessToken = localStorage.getItem('accessToken');

        // Send the payload to the API endpoint
        fetch('http://localhost:8080/api/freshers/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, // Include the Authorization header if required
            },
            body: JSON.stringify(payload), // Convert the payload to a JSON string
        })
            .then(response => {
                if (!response.ok) {
                    // If the response is not 2xx, throw an error
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle success - perhaps clear the form or give user feedback
                console.log('Success:', data);
            })
            .catch(error => {
                // Handle errors - show an error message to the user
                console.error('Error:', error);
            });
    };



    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Add Fresher</h1>
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
                        value={fresherData.name}
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
                        value={fresherData.center || ''}
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
                        Language
                    </label>
                    <input
                        type="text"
                        id="language"
                        name="language"
                        className="w-full p-2 border rounded-md"
                        value={fresherData.language}
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
                        value={fresherData.address}
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
                        value={fresherData.email}
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
                        value={fresherData.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md"
                >
                    Add Fresher
                </button>
            </form>
        </div>
    );
}

export default AddFresher;
