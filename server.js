const express = require('express')
const app = express()
const PORT = process.env.PORT

//const connection = require('./database/connection')


app.listen(PORT, () => {
    console.log(`Server is listening on http://127.0.0.1:${PORT}`)
})


//HOME
app.get('/', (req,res) => {
   
    res.send('Welcome in my server')
})


//INDEX
app.get('/api/movies', (req, res) => {
    res.send("List of movies")
})


//SHOW
app.get('/api/movies/:id', (req, res) => {
    const id = req.params.id;
    res.send(`This is film with id: ${id}`)
})

