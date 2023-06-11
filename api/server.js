const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;

const movieRouter = require('./routes/movie')

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', error=> console.error(error))
db.once('open', ()=> console.log("Database connection established"))


app.use(express.json())
app.use('/movies', movieRouter)
app.use('/api/v1/movies', movieRouter)

app.use(express.static(path.join(__dirname, '../reactjs/build')));


app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname, '../reactjs/build', 'index.html'));
})

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
})