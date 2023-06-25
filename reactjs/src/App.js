import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/Movie';
import Dashboard from './pages/Dashboard';
import Header from './components/header';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import authService from './services/auth.service';



function App() {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(()=>{
    const user = authService.getCurrentUser();
    if(user){
      setCurrentUser(user)
    }
  }, [])

  const logout = () =>{
    authService.logout();
  }

  return (
    <div>
      <div>
        { currentUser
        ?<h2>logged in</h2>
        :<h2>logged out</h2>
        }
      </div>


      <section>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;