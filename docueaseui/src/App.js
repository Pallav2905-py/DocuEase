import logo from './logo.svg';
import './App.css';
import Dashboard from './component/Dashboard';
import { UpdatesCheck } from './component/UpdatesCheck';


function App() {
  return (
    // <Dashboard />
    <UpdatesCheck url={'https://nextjs.org/docs'}/>
  );
}

export default App;
