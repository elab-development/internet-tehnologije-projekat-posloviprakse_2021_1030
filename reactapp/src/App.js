import logo from './logo.svg';
import './App.css';
import Login from './komponente/login/Login';
import JobList from './komponente/jobs/JobList';

function App() {
  return (
    <div className="App">
        <Login></Login>
        <JobList></JobList>
    </div>
  );
}

export default App;
