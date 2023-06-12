import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>I need your help making a Movie List!</h1>
        <p>Click on dashboard to help me out!</p>
        <Link to="/dashboard" >Dashboard</Link>
      </header>
    </div>
  );
}

export default Home;
