import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Student from './pages/Student';
import Dashboard from './pages/Dashboard';

function App() {
  return (
<Router>
    <Routes>
      <Route path="/student/:id" exact element={<Student/>}/>
      <Route path="/dashboard" exact element={<Dashboard/>}/>
      <Route path="/" exact element={<Home/>}/>
    </Routes>
</Router>
  );
}

export default App;
