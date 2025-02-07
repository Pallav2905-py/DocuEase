import React, { useState } from 'react';

const DocSummary = ({ url }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [content, setContent] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);
    const [speaking, setSpeaking] = useState(false);
    let speechSynthesisUtterance = null;

    const fetchSummary = async () => {
        setLoading(true);
        setError(null);
        setContent('');

        try {
            const response = await fetch('http://localhost:5000/scrape', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) throw new Error(`Error: ${response.statusText}`);

            const data = await response.json();
            const rawSummary = data.content || '';
            const cleanedSummary = rawSummary.replace(/```/g, '').trim();
            setContent(cleanedSummary);
        } catch (err) {
            console.error('Error fetching summary:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(content)
            .then(() => {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
            })
            .catch(err => console.error('Failed to copy text:', err));
    };

    const speakSummary = () => {
        if (!content) return;
        stopSpeaking();
        speechSynthesisUtterance = new SpeechSynthesisUtterance(content);
        speechSynthesisUtterance.lang = 'en-US';
        speechSynthesisUtterance.onend = () => setSpeaking(false);
        setSpeaking(true);
        window.speechSynthesis.speak(speechSynthesisUtterance);
    };

    const stopSpeaking = () => {
        window.speechSynthesis.cancel();
        setSpeaking(false);
    };

    const renderFormattedContent = () => {
        return content.split('\n').map((line, index) => {
            line = line.replace(/`/g, '');

            if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={index} style={{ fontWeight: 'bold', marginBottom: '10px' }}>{line.replace(/\*\*/g, '')}</p>;
            }

            if (line.startsWith('*') && line.endsWith('*')) {
                return <p key={index} style={{ fontStyle: 'italic', marginBottom: '10px' }}>{line.replace(/\*/g, '')}</p>;
            }

            if (/^\d+\.\s/.test(line)) {
                return <p key={index} style={{ marginLeft: '20px', marginBottom: '10px' }}>{line.replace(/^\d+\.\s/, '')}</p>;
            }

            return <p key={index} style={{ marginBottom: '10px' }}>{line}</p>;
        });
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        
            <h2>Documentation Summary</h2>

            <button 
                onClick={fetchSummary} 
                disabled={loading} 
                style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#FFF', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '10px' }}>
                {loading ? 'Loading...' : 'Get Summary'}
            </button>

            {error && <p style={{ color: 'red' }}><strong>Error:</strong> {error}</p>}

            {content ? (
                <div>
                    <h3>Summary</h3>
                    
                    {/* Copy Button */}
                    <button 
                        onClick={copyToClipboard} 
                        style={{ padding: '8px 15px', backgroundColor: '#28A745', color: '#FFF', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>
                        Copy to Clipboard
                    </button>
                    
                    {copySuccess && <span style={{ color: 'green', marginLeft: '10px' }}>Copied!</span>}

                    {/* Text-to-Speech Buttons */}
                    {!speaking ? (
                        <button 
                            onClick={speakSummary} 
                            style={{ padding: '8px 15px', backgroundColor: '#FFC107', color: '#000', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Listen
                        </button>
                    ) : (
                        <button 
                            onClick={stopSpeaking} 
                            style={{ padding: '8px 15px', backgroundColor: '#DC3545', color: '#FFF', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Stop
                        </button>
                    )}
                    <div style={{
                        backgroundColor: '#F8F9FA', padding: '10px', borderRadius: '5px', 
                        overflowX: 'auto', whiteSpace: 'pre-wrap', wordWrap: 'break-word', 
                        border: '1px solid #DDD', marginBottom: '10px'
                    }}>
                        {renderFormattedContent()}
                    </div>

                </div>
            ) : (
                !loading && <p>No summary fetched yet.</p>
            )}
        </div>
    );
};

export default DocSummary;
