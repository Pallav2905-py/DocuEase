const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const Groq = require('groq-sdk');
const cheerio = require('cheerio');
const port = 5000;



// Middleware
app.use(bodyParser.json());
app.use(cors());
const groq = new Groq({ apiKey: "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" });


async function scrapeUrl(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        // Extract meaningful text (adjust selectors based on the webpage structure)
        const text = $('p, h1, h2, h3, h4').map((_, el) => $(el).text()).get().join('\n');
        return text.trim();
    } catch (error) {
        throw new Error(`Failed to fetch or parse the URL: ${error.message}`);
    }
}

app.post('/scrape', async (req, res) => {
    // Endpoint to generate PlantUML code

    console.log("Recieved & Processing Request");

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'Text input is required' });
    }

    const text = await scrapeUrl(url);
    // Define headers for the external API
    const myHeaders = {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-717801e7c74a4434a0e3aa4d48963ca8" // Replace with your actual key
    };

    // Define the prompt
    const prompt = `The given text should be converted into a Summarized Format: "${text}" `;

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
        // const jsonObject = JSON.parse(jsonString);
        // console.log(jsonObject);
        console.log(typeof ("Type of RAW Data" + rawData))
        // res.status(200).json({ data: rawData });

        // Use Groq to extract the PlantUML content
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: `Extract only the content information from the text, Strictly return in Json format:\n\n${rawData}`,
                },
            ],
            model: 'llama-3.3-70b-specdec',
            temperature: 0,
            max_tokens: 1024,
        });

        // Directly access the content field from the response
        let summary = chatCompletion.choices[0]?.message?.content?.trim();


        if (summary.startsWith('```') && summary.endsWith('```')) {
            summary = summary.replace(/^```|```$/g, '').trim();
        }
        console.log("content" + summary);
        console.log(typeof summary);
        console.log(typeof summary.content);

        const cleanedString = summary.trim().replace(/^json/, "").trim();

        // Step 2: Parse as JSON
        const parsedData = JSON.parse(cleanedString);

        // Step 3: Join the content array into a single string
        // const contentString = parsedData.content.join("");

        console.log(parsedData.content);
        
        if (summary) {
            res.status(200).json(parsedData);
        } else {
            throw new Error('Failed to extract summary code');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to generate Response' });
    }
});

app.post('/generate-flow-chart', async (req, res) => {
    // Endpoint to generate PlantUML code

    console.log("Recieved & Processing Request");

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL input is required' });
    }
    text = await scrapeUrl(url);
    // Define headers for the external API
    const myHeaders = {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-717801e7c74a4434a0e3aa4d48963ca8" // Replace with your actual key
    };

    // Define the prompt
    const prompt = `The given text: "${text}" should be converted into a Short & sweet PlantUML code that represents a flow chart. Only return the PlantUML code.`;

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
            model: 'llama-3.3-70b-specdec',
            temperature: 0,
            max_tokens: 1024,
        });

        // Directly access the content field from the response
        const plantUML = chatCompletion.choices[0]?.message?.content?.trim();

        console.log("PlantUML: " + plantUML);

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

app.post('/update-check', async (req, res) => {
    const { url } = req.body;

    const prompt = `
        I am building a developer tool to help users stay updated with the latest changes in ${url}. 
        Please provide the following in JSON format:
        {
            "updates": [
                {
                    "title": "Update Title",
                    "description": "Brief description of the update.",
                    "example": "Code snippet showcasing the update.",
                    "documentationLink": "Link to detailed documentation (optional)"
                }
            ]
        }
            Only send json nothing else
    `;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0,
            max_tokens: 32766,
        });

        // Extract data from the chat response
        let data = chatCompletion.choices[0]?.message?.content?.trim();
        console.log(data);
        console.log(typeof data);

        // Trim extra backticks (` ``` `) from start and end, if present
        if (data.startsWith('```') && data.endsWith('```')) {
            data = data.replace(/^```|```$/g, '').trim();
        }

        console.log('After trimming backticks:', data);

        let updates = [];
        try {
            const parsedData = JSON.parse(data); // Attempt to parse the cleaned JSON string
            if (parsedData?.updates && Array.isArray(parsedData.updates)) {
                updates = parsedData.updates;
            }
        } catch (err) {
            console.error('Error parsing JSON:', err);
            return res.status(500).json({ success: false, error: 'Invalid JSON format received from the AI model.' });
        }

        console.log(updates);

        // Send the extracted updates back to the frontend
        res.status(200).json({ success: true, updates });
    } catch (err) {
        console.error('Error fetching updates:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch updates from AI model.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
