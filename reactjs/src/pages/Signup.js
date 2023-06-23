import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';
import '../App.css';

function SignUp() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate();


  const handleSignup = async (event) =>{
    event.preventDefault();
    try{
      await authService.signup(email,password).then(
        response => {
          navigate("/dashboard")
        }
      )
    }catch (error){
      console.error(error)
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Signup Screen</h1>
        <Link to="/dashboard" >Dashboard</Link>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder='email'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder='password'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
          <button type='submit'>Sign up</button>
        </form>
      </header>
    </div>
  );
}

export default SignUp;
