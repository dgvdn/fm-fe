import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MarkDetails = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [centerName, setCenterName] = useState('');
    const [mark1, setMark1] = useState('');
    const [mark2, setMark2] = useState('');
    const [mark3, setMark3] = useState('');
    const [averageMark, setAverageMark] = useState('');
    const [quarterYear, setQuarterYear] = useState('');
    const [comment, setComment] = useState('');
    const [markAvg, setMarkAvg] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch data
    useEffect(() => {
        const fetchMarkData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/marks/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const markData = await response.json();
                setName(markData.name);
                setCenterName(markData.centerName);
                setMark1(markData.mark1);
                setMark2(markData.mark2);
                setMark3(markData.mark3);
                setMarkAvg(markData.markAvg);
                setQuarterYear(markData.quarterYear);
                setComment(markData.comment);
            } catch (error) {
                console.error('Fetch failed:', error);
                // Handle errors here
            } finally {
                setLoading(false);
            }
        };

        fetchMarkData();
    }, [id]);

    // Calculate average mark
    useEffect(() => {
        // Check if any mark is equal to -1
        if (![mark1, mark2, mark3].some((mark) => mark === -1)) {
            // Calculate average only if no mark is equal to -1
            const marks = [parseFloat(mark1), parseFloat(mark2), parseFloat(mark3)].filter((mark) => !isNaN(mark));
            const total = marks.reduce((sum, mark) => sum + mark, 0);
            const avg = total / marks.length || 0;
            setAverageMark(avg.toFixed(2));
        } else {
            // If any mark is equal to -1, set average to an empty string or handle it as needed
            setAverageMark('');
        }
    }, [mark1, mark2, mark3]);
    
    // Function to handle the update button click
    const handleUpdateClick = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken')
            setLoading(true);

            // Perform your update logic here, such as sending data to the server
            const response = await fetch('http://localhost:8080/api/marks/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    fresher: {
                        id: id
                    },
                    mark_1: parseFloat(mark1),
                    mark_2: parseFloat(mark2),
                    mark_3: parseFloat(mark3),
                    mark_avg: parseFloat(averageMark),
                    comment: comment,
                    // Add any other fields you need to send
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log('Update successful!');
        } catch (error) {
            console.error('Update failed:', error);
            // Handle errors here
        } finally {
            // Reset loading state when the update operation is complete
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Mark Details</h2>
            {/* Name */}
            <div className="mb-4 flex items-center">
                <label className="flex-none text-sm font-medium text-gray-600 mr-2">Name:</label>
                <span className="flex-grow mt-1 p-2 border border-gray-300 rounded-md">{name}</span>
            </div>

            {/* Center Name */}
            <div className="mb-4 flex items-center">
                <label className="flex-none text-sm font-medium text-gray-600 mr-2">Center Name:</label>
                <span className="flex-grow mt-1 p-2 border border-gray-300 rounded-md">{centerName}</span>
            </div>

            {/* Quarter Year */}
            <div className="mb-4 flex items-center">
                <label className="flex-none text-sm font-medium text-gray-600 mr-2">Quarter Year:</label>
                <span className="flex-grow mt-1 p-2 border border-gray-300 rounded-md">{quarterYear}</span>
            </div>
            {/* Mark 1 */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Mark 1:</label>
                <input
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    type="number"
                    value={mark1 !== -1 ? mark1 : ''}
                    onChange={(e) => {
                        setMark1(e.target.value);
                    }}
                />
            </div>

            {/* Mark 2 */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Mark 2:</label>
                <input
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    type="number"
                    value={mark2 !== -1 ? mark2 : ''}
                    onChange={(e) => {
                        setMark2(e.target.value);
                    }}
                />
            </div>

            {/* Mark 3 */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Mark 3:</label>
                <input
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    type="number"
                    value={mark3 !== -1 ? mark3 : ''}
                    onChange={(e) => {
                        setMark3(e.target.value);
                    }}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Average Mark:</label>
                <input
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    type="text"
                    value={averageMark}
                    readOnly
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Comment:</label>
                <textarea
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={handleUpdateClick}
                >
                    Update
                </button>
            )}
        </div>
    );
};

export default MarkDetails;
