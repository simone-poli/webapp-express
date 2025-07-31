const express = require('express')
const app = express()
const PORT = process.env.PORT

const connection = require('./database/connection')


app.listen(PORT, () => {
    console.log(`Server is listening on http://127.0.0.1:${PORT}`)
})


//HOME
app.get('/', (req,res) => {
   
    res.send('Welcome in my server')
})


//INDEX
app.get('/api/movies', (req, res) => {
    const sql = 'SELECT * FROM movies';

    connection.query(sql, (err, result)=> {
        if (err) return res.status(500).json({
            err: true,
            message: err.message
        })
        console.log(result)
        res.json(result)
    })
    
})


//SHOW
app.get('/api/movies/:id', (req, res) => {
    const id = Number(req.params.id);
    const sql= `SELECT * FROM movies WHERE id=?`

    connection.query(sql, [id], (err,result) =>{
        if(err) return res.status(500).json({
            error: true,
            message: err.message
        })
       
        if (result.length === 0) {
            return res.status(404).json({
                error: true,
                message: 'Not found'
            })
        }
        const movie = result[0]

        const reviewSql = 'SELECT * FROM reviews WHERE movie_id = ?'
        connection.query(reviewSql , [id], (err,result) =>{
            if(err) return res.status(500).json({
                error: true,
                message: err.message
            })
            const movieReviews = result
            movie.reviews = movieReviews
            console.log(movie)
            res.json(movie)
        })
    })

})

