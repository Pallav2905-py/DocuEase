import React, { useState } from 'react';

const Summary = ({ url }) => {
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state
    const [content, setContent] = useState(''); // Summary content

    const fetchSummary = async () => {
        setLoading(true);
        setError(null);
        setContent('');

        try {
            const response = await fetch('http://localhost:5000/scrape', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();

            // Clean the response to extract the JSON part
            const rawSummary = data.summary;
            const cleanedSummary = rawSummary.replace(/```json|```/g, '').trim();

            // Parse the cleaned JSON string
            const parsedSummary = JSON.parse(cleanedSummary);

            if (parsedSummary?.content) {
                setContent(parsedSummary.content);
            } else {
                throw new Error('No content found in the summary.');
            }
        } catch (err) {
            console.error('Error fetching summary:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const renderFormattedContent = () => {
        return content.split('\n').map((line, index) => {
            // Remove backticks
            line = line.replace(/`/g, '');

            // Handle numbered list (1., 2., 3., etc.)
            if (/^\d+\./.test(line)) {
                return (
                    <p key={index} style={{ marginLeft: '20px', marginBottom: '10px' }}>
                        {line.replace(/^\d+\.\s*/, '')} {/* Remove the number and period */}
                    </p>
                );
            }

            // Handle bold (**bold**)
            if (line.startsWith('**') && line.endsWith('**')) {
                return (
                    <p key={index} style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                        {line.replace(/\*\*/g, '')} {/* Remove the surrounding '**' */}
                    </p>
                );
            }

            // Handle italic (*italic*)
            if (line.startsWith('*') && line.endsWith('*')) {
                return (
                    <p key={index} style={{ fontStyle: 'italic', marginBottom: '10px' }}>
                        {line.replace(/\*/g, '')} {/* Remove the surrounding '*' */}
                    </p>
                );
            }

            // Default case for normal text
            return <p key={index} style={{ marginBottom: '10px' }}>{line}</p>;
        });
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Documentation Summary</h2>
            <button
                onClick={fetchSummary}
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
                {loading ? 'Loading...' : 'Get Summary'}
            </button>

            {error && (
                <p style={{ color: 'red' }}>
                    <strong>Error:</strong> {error}
                </p>
            )}

            {content ? (
                <div>
                    <h3>Summary</h3>
                    <div
                        style={{
                            backgroundColor: '#F8F9FA',
                            padding: '10px',
                            borderRadius: '5px',
                            overflowX: 'auto',
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word',
                            border: '1px solid #DDD',
                        }}
                    >
                        {renderFormattedContent()}
                    </div>
                </div>
            ) : (
                !loading && <p>No summary fetched yet.</p>
            )}
        </div>
    );
};

export default Summary;
