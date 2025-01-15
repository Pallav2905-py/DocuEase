import React, { useState } from 'react';

export const UpdatesCheck = ({ url }) => {
    const [updates, setUpdates] = useState([]); // State to store updates
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    const fetchUpdates = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('http://localhost:5000/update-check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.statusText}`);
            }

            const { updates } = await res.json(); // Extract updates directly from the response
            setUpdates(updates || []); // Update state with the received updates
        } catch (err) {
            console.error('Error fetching updates:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Check for Documentation Updates</h2>
            <button
                onClick={fetchUpdates}
                disabled={loading}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginBottom: '20px',
                }}
            >
                {loading ? 'Checking...' : 'Check Updates'}
            </button>

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {updates.length > 0 ? (
                <div>
                    <h3>Recent Updates</h3>
                    <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                        {updates.map((update, index) => (
                            <li
                                key={index}
                                style={{
                                    border: '1px solid #DDD',
                                    borderRadius: '5px',
                                    padding: '15px',
                                    marginBottom: '10px',
                                    backgroundColor: '#F9F9F9',
                                }}
                            >
                                <h4 style={{ marginBottom: '10px' }}>{update.title}</h4>
                                <p>{update.description}</p>
                                {update.example && (
                                    <div>
                                        <h5>Example:</h5>
                                        <pre
                                            style={{
                                                backgroundColor: '#EEE',
                                                padding: '10px',
                                                borderRadius: '5px',
                                                overflowX: 'auto',
                                            }}
                                        >
                                            <code>{update.example}</code>
                                        </pre>
                                    </div>
                                )}
                                {update.documentationLink && (
                                    <p>
                                        <a
                                            href={update.documentationLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: '#007BFF' }}
                                        >
                                            View Documentation
                                        </a>
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                !loading && <p>No recent updates found.</p>
            )}
        </div>
    );
};
