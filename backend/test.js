const data = `data: { "content": "Okay", "model": "aicon-v4-nano-160824", "timestamp": 1736954147515, "processing_id": "f9baaa87-0c5a-4450-bc53-42d956cb4e0e", "conversation_id": "7d301d82-68b6-4eb7-8ed7-8018cf126b21_conv_1736954146416" } data: { "content": ", I will summarize the provided text about React's useEffect Hook.", "model": "aicon-v4-nano-160824", "timestamp": 1736954147732, "processing_id": "f9baaa87-0c5a-4450-bc53-42d956cb4e0e", "conversation_id": "7d301d82-68b6-4eb7-8ed7-8018cf126b21_conv_1736954146416" } data: { "content": " Here's my approach:\n\n1.  **Identify Key Concepts:** I", "model": "aicon-v4-nano-160824", "timestamp": 1736954147844, "processing_id": "f9baaa87-0c5a-4450-bc53-42d956cb4e0e", "conversation_id": "7d301d82-68b6-4eb7-8ed7-8018cf126b21_conv_1736954146416" } data: { "content": " will extract the core ideas about useEffect, its purpose, parameters, return value, and caveats.\n2.  **Organize Information:** I will group", "model": "aicon-v4-nano-160824", "timestamp": 1736954148093, "processing_id": "f9baaa87-0c5a-4450-bc53-42d956cb4e0e", "conversation_id": "7d301d82-68b6-4eb7-8ed7-8018cf126b21_conv_1736954146416" } data: { "content": " the information logically, covering usage, examples, dependencies, and troubleshooting.\n3.  **Concise Summary:** I will present the information in a summarized form", "model": "aicon-v4-nano-160824", "timestamp": 1736954148326, "processing_id": "f9baaa87-0c5a-4450-bc53-42d956cb4e0e", "conversation_id": "7d301d82-68b6-4eb7-8ed7-8018cf126b21_conv_1736954146416" } data: { "content": ", avoiding excessive detail but retaining the key points.\n\nHere's the summarized output:\n\n**Summary of React's useEffect Hook**\n\nuseEffect is a React Hook that synchronizes a component with an external system.", "model": "aicon-v4-nano-160824", "timestamp": 1736954148636, "processing_id": "f9baaa87-0c5a-4450-bc53-42d956cb4e0e", "conversation_id": "7d301d82-68b6-4eb7-8ed7-8018cf126b21_conv_1736954146416" } data: { "content": " It's called at the top level of a component to declare an Effect.\n\n**Parameters:**\n\n*   **setup function:** Contains the Effect's logic, which can optionally return a cleanup function. The setup function runs", "model": "aicon-v4-nano-160824", "timestamp": 1736954148973, "processing_id": "f9baaa87-0c5a-4450-bc53-42d956cb4e0e", "conversation_id": "7d301d82-68b6-4eb7-8ed7-8018cf126b21_conv_1736954146416" } data: { "content": " when the component mounts and after re-renders with changed dependencies. The cleanup function runs before every re-render with changed dependencies, and when the component unmounts.\n*   **optional dependencies array:** A list of reactive values (props, state, variables, functions) used inside the setup code. If dependencies change, the effect re-runs. An empty array means the Effect runs only on mount and unmount. Omitting dependencies makes the Effect run on every render.\n\n**Returns:**\n\n*   useEffect returns undefined.\n\n**Caveats:**\n\n*   Can only be called at", "model": "aicon-v4-nano-160824", "timestamp": 1736954149865, "processing_id": "f9baaa87-0c5a-4450-bc53-42d956cb4e0e", "conversation_id": "7d301d82-68b6-4eb7-8ed7-8018cf126b21_conv_1736954146416" } data: { "content": " the top level of a component or custom Hooks.\n*   Avoid using Effects when not synchronizing with an external system.\n*   In Strict Mode, React runs setup and cleanup an extra time for testing purposes.\n*   Object/function dependencies created during rendering can cause unnecessary re-runs.\n*  ", "model": "aicon-v4-nano-160824", "timestamp": 1736954150314, "processing_id": "f9baaa87-0c5a-4450-bc53-42d956cb4e0e", "conversation_id": "7d301d82-68b6-4eb7-8ed7-8018cf126b21_conv_1736954146416" } data: { "content": "Effects generally run after the browser paints the updated screen, use useLayoutEffect if timing is crucial.\n*   Effects only run on the client.\n\n**Usage:**\n\n*   **Connecting to External Systems:** Used to integrate with networks, browser APIs, or third-party libraries.\n*   **", "model": "aicon-v4-nano-160824", "timestamp": 1736954150764, "processing_id": "f9baaa87-0c5a-4450-bc53-42d956cb4e0e", "conversation_id": "7d301d82-68b6-4eb7-8ed7-8018cf126b21_conv_1736954146416" } data: { "content": "Custom Hooks:** Effects can be wrapped into custom Hooks for reusable logic.\n*   **Controlling Non-React Widgets:** Effects can update the state of non-React components.\n*   **Fetching Data:** Used for fetching data, though framework mechanisms are preferable. Avoid race conditions by setting a flag in cleanup.", "model": "aicon-v4-nano-160824", "timestamp": 1736954151239, "processing_id": "f9baaa87-0c5a-4450-bc53-42d956cb4e0e", "conversation_id": "7d301d82-68b6-4eb7-8ed7-8018cf126b21_conv_1736954146416" } data: { "content": "\n\n**Dependencies:**\n\n*   All reactive values used inside an Effect must be declared as dependencies.\n*   To remove a dependency, prove that it does not need to be reactive or move the logic outside the component.\n*   Avoid object dependencies and function dependencies if possible, use useMemo or useCallback for functions", "model": "aicon-v4-nano-160824", "timestamp": 1736954151683, "processing_id": "f9baaa87-0c5a-4450-bc53-42d956cb4e0e", "conversation_id": "7d301d82-68b6-4eb7-8ed7-8018cf126b21_conv_1736954146416" } data: { "content": ".\n\n**Updating State:**\n\n* When updating state based on a previous state, use the updater function to prevent issues with dependency arrays.\n\n**Advanced Concepts:**\n\n*   Effect Events (experimental) allow reading the latest props and states without \"reacting\" to them, they are not included in the dependency array", "model": "aicon-v4-nano-160824", "timestamp": 1736954152136, "processing_id": "f9baaa87-0c5a-4450-bc53-42d956cb4e0e", "conversation_id": "7d301d82-68b6-4eb7-8ed7-8018cf126b21_conv_1736954146416" } data: { "content": ".\n*   The text mentions handling rendering differences between server and client, with a suggestion that this should be used sparingly.\n\n**Troubleshooting:**\n\n*   Effects running twice on mount can be due to Strict Mode (a development feature to ensure correct cleanup implementation).\n*   Effects re-running on every render", "model": "aicon-v4-nano-160824", "timestamp": 1736954152590, "processing_id": "f9baaa87-0c5a-4450-bc53-42d956cb4e0e", "conversation_id": "7d301d82-68b6-4eb7-8ed7-8018cf126b21_conv_1736954146416" } data: { "content": " is often due to missing dependencies or dependencies that are different on every render (objects created during rendering).\n*  Effects can cause infinite loops when the dependency updates, and then causes the effect to update the dependency again.\n*   The cleanup runs before the component unmounts, and also before every re-render", "model": "aicon-v4-nano-160824", "timestamp": 1736954153006, "processing_id": "f9baaa87-0c5a-4450-bc53-42d956cb4e0e", "conversation_id": "7d301d82-68b6-4eb7-8ed7-8018cf126b21_conv_1736954146416" } data: { "content": " when the dependency changes, which means that the setup logic should always have a corresponding cleanup logic.\n*   If an Effect is visual, consider using useLayoutEffect to prevent flickering.\n", "model": "aicon-v4-nano-160824", "timestamp": 1736954153300, "processing_id": "f9baaa87-0c5a-4450-bc53-42d956cb4e0e", "conversation_id": "7d301d82-68b6-4eb7-8ed7-8018cf126b21_conv_1736954146416" } data: { "content": "", "model": "aicon-v4-nano-160824", "finishReason": "stop", "timestamp": 1736954153325, "processing_id": "f9baaa87-0c5a-4450-bc53-42d956cb4e0e", "conversation_id": "7d301d82-68b6-4eb7-8ed7-8018cf126b21_conv_1736954146416", "processingCount": 5163, "wordCount": 5163, "sources": [], "formattedSources": [] }`


// const jsonObject = JSON.parse(data);
// console.log(jsonObject);


function parseAndCombineImportantText(dataString) {
    const dataLines = dataString.split("\n");
    let combinedContent = "";

    dataLines.forEach(line => {
        try {
            // Match the JSON object pattern in the line.
            const match = line.match(/data: (\{.*\})/);
            if (match && match[1]) {
                // Parse the JSON string to extract the content.
                const jsonData = JSON.parse(match[1]);
                if (jsonData.content) {
                    combinedContent += jsonData.content.trim() + " ";
                }
            }
        } catch (error) {
            console.error("Error parsing line:", line, error);
        }
    });

    return combinedContent.trim();
}

// // Example usage:
// const dataString = `data: {"content":"I will summarize the provided text about React's \`useEffect\` Hook.","model":"aicon-v4-nano-160824","timestamp":1736954147732,"processing_id":"f9baaa87-0c5a-4450-bc53-42d956cb4e0e","conversation_id":"7d301d82-68b6-4eb7-8ed7-8018cf126b21_conv_1736954146416"}
// data: {"content":"Here's my approach:\n\n1. **Identify Key Concepts:** I","model":"aicon-v4-nano-160824","timestamp":1736954147844,"processing_id":"f9baaa87-0c5a-4450-bc53-42d956cb4e0e","conversation_id":"7d301d82-68b6-4eb7-8ed7-8018cf126b21_conv_1736954146416"}
// data: {"content":"will extract the core ideas about \`useEffect\`, its purpose, parameters, return value, and caveats.\n2. **Organize Information:** I will group","model":"aicon-v4-nano-160824","timestamp":1736954148093,"processing_id":"f9baaa87-0c5a-4450-bc53-42d956cb4e0e","conversation_id":"7d301d82-68b6-4eb7-8ed7-8018cf126b21_conv_1736954146416"}`;

// // Call the function with the data string.
// const importantText = parseAndCombineImportantText(data);
// console.log(importantText);


function parseAndFixData(dataString) {
    // Split the string into individual lines
    const dataLines = dataString.split("\n");

    // Initialize an array to hold parsed JSON objects
    let parsedData = [];

    // Loop through each line
    dataLines.forEach(line => {
        try {
            // Clean the line: remove 'data :' or 'data:'
            let cleanedLine = line.replace(/^data\s*:\s*/, "");

            // Remove unwanted characters like additional spaces or invalid characters
            cleanedLine = cleanedLine.trim();

            // Ensure that JSON is well-formed (fixing common mistakes)
            // Example: Fix missing quotes, add commas, etc.
            cleanedLine = cleanedLine.replace(/(\w+)\s*:/g, '"$1":'); // Ensure keys are quoted

            // Parse the cleaned string into JSON
            const jsonData = JSON.parse(cleanedLine);

            // Store the parsed JSON data
            parsedData.push(jsonData);
        } catch (error) {
            console.error("Error parsing line:", line, error);
        }
    });

    // Return the parsed JSON array
    return parsedData;
}

// Example input (with missing commas between some blocks)
const dataString = `data: { "content": "Okay", "model": "aicon-v4-nano-160824", "timestamp": 1736954147515, "processing_id": "f9baaa87-0c5a-4450-bc53-42d956cb4e0e", "conversation_id": "7d301d82-68b6-4eb7-8ed7-8018cf126b21_conv_1736954146416" }
data: { "content": ", I will summarize the provided text about React's useEffect Hook.", "model": "aicon-v4-nano-160824", "timestamp": 1736954147732, "processing_id": "f9baaa87-0c5a-4450-bc53-42d956cb4e0e", "conversation_id": "7d301d82-68b6-4eb7-8ed7-8018cf126b21_conv_1736954146416" }
data: { "content": " Here's my approach:"}`;

// Call the function
const result = parseAndFixData(data);
console.log(result);
