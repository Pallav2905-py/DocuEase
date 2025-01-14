import React, { useState } from 'react';
import plantumlEncoder from 'plantuml-encoder';

function Dashboard() {
    const [flowchartUrl, setFlowchartUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchFlowchart = async () => {
        setLoading(true);
        try {
            // Replace with your backend endpoint
            const response = await fetch('http://localhost:5000/generate-flow-chart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                text:"**Introduction to useState Hook** ================================ The `useState` hook in React is a fundamental building block for managing state in functional components. It allows you to add state to functional components, making it possible to update the component's UI based on user interactions or other events. **How useState Works** -------------------- Here's a step-by-step breakdown of how `useState` works: 1. **Importing useState**: You import the `useState` hook from the `react` library. 2. **Declaring State**: You declare a state variable and an `Updater` function using the `useState` hook. 3. **Initializing State**: You pass an initial value to the `useState` hook to set the initial state. 4. **Updating State**: When the state needs to be updated, you call the `Updater` function with the new value. 5. **Rendering Component**: The component re-renders with the updated state value. **Flow Chart** ------------- Here's a flow chart illustrating the `useState` hook process: ```mermaid graph LR A[Component Mounts] -->|useState called|> B[Declare State and Updater] B -->|Initial Value|> C[Initialize State] C -->|User Interaction|> D[Updater Function Called] D -->|New Value|> E[Update State] E -->|Component Re-renders|> F[Render Component with Updated State] F -->|User Interaction|> D D -->|Updater Function Called|> E ``` **Key Elements** -------------- Here are the key elements involved in the `useState` hook: * **State Variable**: The variable that stores the current state value. * **Updater Function**: The function that updates the state value. * **Initial Value**: The initial value passed to the `useState` hook. * **Component**: The functional component that uses the `useState` hook. **Code Example** ```jsx import { useState } from 'react'; function Counter() { // Declare state and updater const [count, setCount] = useState(0); // Update state when button is clicked return ( <div> <p>Count: {count}</p> <button onClick={() => setCount(count + 1)}>Increment</button> </div> ); } ``` In this example, the `useState` hook is used to declare a `count` state variable and an `setCount` updater function. The `count` state is initialized to 0, and the `setCount` function is called when the button is clicked to update the state. The component re-renders with the updated state value."                }),
            });
            console.log("Completed the API request");
            
            const data = await response.json();
            console.log(data);
            const plantumlCode = data.content.match(/```plantuml\n([\s\S]*?)\n```/)[1]; // Extract PlantUML code
            const encoded = plantumlEncoder.encode(plantumlCode);
            const url = `http://www.plantuml.com/plantuml/svg/${encoded}`;
            setFlowchartUrl(url);
            console.log(url);
            
        } catch (error) {
            console.error('Error fetching flowchart:', error);
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
                <div className="flowchart-container">
                    {loading && <p>Loading flowchart...</p>}
                    {!loading && flowchartUrl ? (
                        <img src={flowchartUrl} alt="Flowchart" />
                    ) : (
                        <p>Flowchart will appear here...</p>
                    )}
                </div>
                <button className="generate-btn" onClick={fetchFlowchart}>
                    Generate New Flowchart
                </button>
            </main>

            <footer></footer>
        </div>
    );
}

export default Dashboard;
