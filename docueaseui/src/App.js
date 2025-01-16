import logo from './logo.svg';
import './App.css';
import Dashboard from './component/Dashboard';
import { UpdatesCheck } from './component/UpdatesCheck';
import { useState } from 'react';


function App() {
  const [url, setUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(true); // To control the visibility of the URL input field.
  const [hideInput, setHideInput] = useState(false);
  

  const handleSetUrl = () => {
    setHideInput(true);
    console.log('URL set:', url);
  };

  return (<>
    {/* {!hideInput && (
      <>
        <div className={`url-input-container ${hideInput ? 'hidden' : ''}`}>
          <label htmlFor="url">Enter URL:</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter the URL here"
          />
        </div>

        <button onClick={handleSetUrl} className="generate-btn">
          Set URL
        </button>
      </>)
    } */}

    <Dashboard/>
    {/* <UpdatesCheck url={url} /> */}
  </>
  );
}

export default App;
