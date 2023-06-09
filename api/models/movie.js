const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Movie', movieSchema)
