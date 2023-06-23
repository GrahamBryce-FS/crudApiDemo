import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

import authService from '../services/auth.service';
import moviesService from '../services/movies.service';

function Dashboard() {
  const [movies, setMovies] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [values, setValues]= useState({
    title: '',
    director:'',
    genre:''
  })

  const navigate = useNavigate();

  const API_BASE = process.env.NODE_ENV === 'development' 
    ? `http://localhost:8000/api/v1`
    : process.env.REACT_APP_BASE_URL;

    let ignore = false;
    useEffect(() => {
      moviesService.getallPrivateMovies().then(
        response =>{
          console.log(response.data);
          setMovies(response.data)
        },
        (error) => {
          console.log("Secured page error: ", error.response);
          if(error.response && error.response.status == 403){
            authService.logout();
            navigate('/login')
          }
        }
      )


      // if(!ignore){
      //   getMovies();
      // }

      // return () => {
      //   ignore = true;
      // }
    }, [])

    const getMovies = async () =>{
      setLoading(true)
      try {
        await fetch(`${API_BASE}/movies`)
                .then(res => res.json())
                .then(data =>{
                  console.log(API_BASE,{data});
                  setMovies(data)
                })
      }catch(error) {
        setError(error.message || "Unexpected error")
      } finally {
        setLoading(false)
      }
    }



    const createMovies = async() => {
      try {
        await fetch(`${API_BASE}/movies`,{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        }).then(() => getMovies())
      }catch(error) {
        setError(error.message || "Unexpected error")
      } finally {
        setLoading(false)
      }
    }

    const handleSubmit = (event) =>{
      event.preventDefault();
      createMovies();
    }

    const handleInputChanges = (event) =>{
      event.persist();
      setValues((values) => ({
        ...values,
        [event.target.name]: event.target.value
      }))
    }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movies List Page!</h1>
        <h2>Add a movie to the list!</h2>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="input-container">
            <label>Title:</label>
            <input className="input-field" type="text" name="title" value={values.title} onChange={handleInputChanges} />
          </div>

          <div className="input-container">
            <label>Director:</label>
            <input className="input-field" type="text" name="director" value={values.director} onChange={handleInputChanges} />
          </div>

          <div className="input-container">
            <label>Genre:</label>
            <input className="input-field" type="text" name="genre" value={values.genre} onChange={handleInputChanges} />
          </div>

          <input type="submit" value="Submit" className="submit-button" />
        </form>
        <ul>
          {
            movies && movies.map(movie => (
              <li key ={movie._id}>
                <Link to={`/movie/${movie._id}`}>{movie.title}</Link>
              </li>
            ))
          }
        </ul>
        <h2>Click on a movie above to update or delete them!</h2>
      </header>
    </div>
  );
}

export default Dashboard;

