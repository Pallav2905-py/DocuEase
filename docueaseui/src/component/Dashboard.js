import React, { useState } from 'react';
import plantumlEncoder from 'plantuml-encoder';

function Dashboard() {
    const [flowchartUrl, setFlowchartUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState('');  // New state for URL input
    const [scrapedText, setScrapedText] = useState('');  // State for storing scraped content

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const fetchFlowchart = async () => {
        if (!url) {
            setError('Please enter a URL');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            // Scrape the content from the URL (you can use a scraping function here)
            const response = await fetch(`http://localhost:5000/scrape-url?url=${encodeURIComponent(url)}`);
            
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            
            const data = await response.json();
            const scrapedText = data.content;  // Assuming the scraped content is in the `content` field

            if (scrapedText) {
                setScrapedText(scrapedText);  // Store the scraped content in state
                await generateFlowchart(scrapedText);  // Pass the scraped text to the flowchart generation
            } else {
                throw new Error('No content scraped from the URL');
            }
        } catch (error) {
            console.error('Error fetching scraped content:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const generateFlowchart = async (text) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/generate-flow-chart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: text,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            const plantumlCode = data.plantumlCode;

            if (plantumlCode) {
                const extractedCode = plantumlCode.replace(/```plantuml|```/g, '').trim();
                console.log("code" + extractedCode);
                
                const encoded = plantumlEncoder.encode(extractedCode);
                const url = `http://www.plantuml.com/plantuml/svg/${encoded}`;
                setFlowchartUrl(url);
            } else {
                throw new Error('No PlantUML code received from the server');
            }
        } catch (error) {
            console.error('Error generating flowchart:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <header>
                <h1>DocuEase</h1>
                <button className="settings-btn">Settings</button>
            </header>

            <nav>
                <ul>
                    <li><button>Interactive Flowchart</button></li>
                    <li><button>Documentation Summary</button></li>
                    <li><button>Progress Tracker</button></li>
                    <li><button>Update Check</button></li>
                </ul>
            </nav>

            <main>
                <h2>Interactive Flowchart</h2>
                <div className="url-input-container">
                    <label htmlFor="url-input">Enter URL:</label>
                    <input
                        id="url-input"
                        type="text"
                        value={url}
                        onChange={handleUrlChange}
                        placeholder="Enter URL here"
                    />
                    <button className="fetch-btn" onClick={fetchFlowchart} disabled={loading}>
                        {loading ? 'Fetching...' : 'Fetch and Generate Flowchart'}
                    </button>
                </div>

                <div className="flowchart-container">
                    {loading && <p>Loading flowchart...</p>}
                    {error && <p className="error">Error: {error}</p>}
                    {!loading && !error && flowchartUrl ? (
                        <img src={flowchartUrl} alt="Generated Flowchart" />
                    ) : (
                        !loading && <p>Flowchart will appear here...</p>
                    )}
                </div>
            </main>

            <footer>
                <p>&copy; {new Date().getFullYear()} DocuEase. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Dashboard;
