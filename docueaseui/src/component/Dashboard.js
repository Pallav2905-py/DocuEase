import React from 'react'

function Dashboard() {
    return (
        <>
            <div class="container">
                <header>
                    <h1>DocuEase</h1>
                    <button class="settings-btn">Settings</button>
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
                    <div class="flowchart-container">
                        <p>Flowchart will appear here...</p>
                    </div>
                    <button class="generate-btn">Generate New Flowchart</button>
                </main>

                <footer>
                </footer>
            </div>
        </>
    )
}

export default Dashboard
