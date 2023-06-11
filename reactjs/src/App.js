import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/Movie';
import Dashboard from './pages/Dashboard';



function App() {
  return (

<Router>
    <Routes>
      <Route path="/movie/:id" exact element={<Movie/>}/>
      <Route path="/dashboard" exact element={<Dashboard/>}/>
      <Route path="/" exact element={<Home/>}/>
    </Routes>
</Router> 
  );
}

export default App;
