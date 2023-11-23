import React, { useState, useEffect } from 'react';

const LanguageStatisticPage = () => {
    const [languageStatistics, setLanguageStatistics] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchLanguageStatistics = async () => {
        setIsLoading(true);
        setError(null);

        const url = 'http://localhost:8080/api/statistics/languages';

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setLanguageStatistics(data);
        } catch (error) {
            console.error('Error fetching language statistics:', error);
            setError('Error fetching language statistics. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLanguageStatistics();
    }, []);

    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [selectedLanguageFreshers, setSelectedLanguageFreshers] = useState([]);
    const [isLoadingLanguageFreshers, setIsLoadingLanguageFreshers] = useState(false);
    const [errorLanguageFreshers, setErrorLanguageFreshers] = useState(null);

    const handleLanguageClick = async (language) => {
        if (language === 'C#') {
            language = 'C%23';
        }
        setSelectedLanguage(language);

        try {
            setIsLoadingLanguageFreshers(true);

            const response = await fetch(`http://localhost:8080/api/statistics/languages/${language}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            setSelectedLanguageFreshers(data);
        } catch (error) {
            console.error(`Error fetching freshers for language ${language}:`, error);
            setErrorLanguageFreshers(`Error fetching freshers for language ${language}. Please try again.`);
        } finally {
            setIsLoadingLanguageFreshers(false);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Language Statistic Page</h1>

            {isLoading && <p className="text-gray-700">Loading...</p>}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {Object.keys(languageStatistics).length > 0 && (
                <div className="bg-white p-6 rounded-md shadow-md">
                    <h2 className="text-lg font-bold mb-4">Fresher Count by Programming Language</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Language
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Count
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(languageStatistics).map(([language, count]) => (
                                <tr key={language} onClick={() => handleLanguageClick(language)} className="cursor-pointer hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{language}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {/* Display Freshers List for Selected Language */}
            {selectedLanguage && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Freshers in {selectedLanguage} Language</h2>
                    {isLoadingLanguageFreshers && <p className="text-gray-700">Loading...</p>}
                    {errorLanguageFreshers && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
                            <strong>Error:</strong> {errorLanguageFreshers}
                        </div>
                    )}
                    {selectedLanguageFreshers.length > 0 && (
                        <table className="min-w-full divide-y divide-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Center
                                </th>

                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Period
                                </th>
                            </tr>
                            <tbody>
                                {selectedLanguageFreshers.map((fresher) => (
                                    <tr key={fresher.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fresher.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fresher.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fresher.centerName}</td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fresher.quarterYear}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};

export default LanguageStatisticPage;
