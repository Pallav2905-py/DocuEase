const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Endpoint to generate PlantUML code
app.post('/generate-flow-chart', async (req, res) => {

    console.log("Recieved & Processing Request");
    
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text input is required' });
    }

    // Define headers for the external API
    const myHeaders = {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-717801e7c74a4434a0e3aa4d48963ca8" // Replace with your actual key
    };

    // Define the prompt
    const prompt = `The given text: "${text}" should be converted into a PlantUML code that represents a flow chart. Only return the PlantUML code.`;

    // Define the request body for the external API
    const raw = JSON.stringify({
        "question": prompt,
        "model": "aicon-v4-nano-160824",
        "randomness": 0.5,
        "stream_data": true,
        "response_type": "text"
    });

    // Fetch response from the external API
    try {
        const response = await fetch("https://api.worqhat.com/api/ai/content/v4", {
            method: 'POST',
            headers: myHeaders,
            body: raw
        });

        const data = await response.text();
        console.log(data);
        
        // Return the PlantUML code as the response
        res.status(200).send(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to generate PlantUML code' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
