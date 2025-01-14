const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const Groq = require('groq-sdk');

const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
const groq = new Groq({ apiKey: "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" });
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
    // Extract only PlantUML code from the raw response and send it back as JSON
    try {
        const response = await fetch("https://api.worqhat.com/api/ai/content/v4", {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        });

        const rawData = await response.text(); // Get the raw string response
        console.log('Raw API Response:', rawData);

        // Use Groq to extract the PlantUML content
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: `Extract only the PlantUML code from the following text:\n\n${rawData}`,
                },
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0,
            max_tokens: 1024,
        });

        // Directly access the content field from the response
        const plantUML = chatCompletion.choices[0]?.message?.content?.trim();

        if (plantUML) {
            res.status(200).json({ plantumlCode: plantUML });
        } else {
            throw new Error('Failed to extract PlantUML code');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to generate flowchart' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
