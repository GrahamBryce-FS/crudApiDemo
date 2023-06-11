import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';



function Movie() {
  const [movies, setMovies] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [values, setValues]= useState({
    title: '',
    director:''
  })


  const { id } = useParams()
  const navigate = useNavigate();

  const API_BASE = process.env.NODE_ENV === 'development' 
    ? `http://localhost:8000/api/v1`
    : process.env.REACT_APP_BASE_URL;

    let ignore = false;
    useEffect(() => {

      if(!ignore){
        getMovies();
      }

      return () => {
        ignore = true;
      }
    }, [])

    const getMovies = async () =>{
      setLoading(true)
      try {
        await fetch(`${API_BASE}/movies/${id}`)
                .then(res => res.json())
                .then(data =>{
                  console.log({data});
                  // const { name, class } = data
                  setValues({
                    title:data.title,
                    director: data.director
                  })
                })
      }catch(error) {
        setError(error.message || "Unexpected error")
      } finally {
        setLoading(false)
      }
    }

    const deleteMovie = async() => {
      try {
        await fetch(`${API_BASE}/movies/${id}`,{
          method: 'DELETE'
        })
                .then(res => res.json())
                .then(data =>{
                  setMovies(data)
                  navigate("/dashboard", { replace:true})
                })
      }catch(error) {
        setError(error.message || "Unexpected error")
      } finally {
        setLoading(false)
      }
    }


    const updateMovie = async() => {
      try {
        await fetch(`${API_BASE}/movies/${id}`,{
          method: 'PATCH',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })
                .then(res => res.json())
                .then(data =>{
                  console.log({data});
                })
      }catch(error) {
        setError(error.message || "Unexpected error")
      } finally {
        setLoading(false)
      }
    }

    const handleSubmit = (event) =>{
      event.preventDefault();
      updateMovie();
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
        <h1>This Movie</h1>
        <h5>{values && values.title}</h5>
        <p>{values && values.director}</p>
        <button onClick={()=> deleteMovie()}>Delete Movie</button>
        <Link to="/" >Home</Link>
        <Link to="/dashboard" >Dashboard</Link>

        <form onSubmit={(event)=> handleSubmit(event)}>
          <label>
            Name:
            <input type='text' name='title' value={values.title} onChange={handleInputChanges}/>
          </label>
          <label>
            Class:
            <input type='text' name='director' value={values.director} onChange={handleInputChanges}/>
          </label>
          <input type='submit' value="Submit"/>
        </form>

      </header>
    </div>
  );
}

export default Movie;
