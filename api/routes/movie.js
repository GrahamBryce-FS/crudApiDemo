const express = require('express');
const router = express.Router()

const Movie = require('../models/movie')

const getMovie = async(req,res,next) => {
    let movie 
    try {
        movie = await Movie.findById(req.params.id)
        if(movie === null){
            return res.status(404).json({ message: "Movie not Found"})
        }
    } catch(error){
        return res.status(500).json({ message: error.message })
    }
    res.movie = movie;
    next()
}

router.get('/', async (req,res)=>{
    try {
        const movies = await Movie.find()
        res.json(movies)
    } catch(error){
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', getMovie, async (req,res)=>{
    res.json(res.movie)
})

router.post('/', async (req,res)=>{
    const movie = new Movie({
        title: req.body.title,
        director: req.body.director,
        genre: req.body.director
    })
    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie)
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
})

router.patch('/:id', getMovie, async (req, res) => {
    if (req.body.title != null) {
        res.movie.title = req.body.title;
    }
    if (req.body.director != null) {
        res.movie.director = req.body.director; 
    }
    if (req.body.genre != null) {
        res.movie.genre = req.body.genre; 
    }
    try {
        const updatedMovie = await res.movie.save();
        res.json(updatedMovie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.delete('/:id',getMovie, async (req,res)=>{
    try{

        await Movie.findByIdAndRemove(req.params.id);
        res.json({message: "Removed Movie"})
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports=router;

