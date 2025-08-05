const connection = require('../database/connection')




function index(req, res) {
    const sql = 'SELECT * FROM movies';

    connection.query(sql, (err, result)=> {
        if (err) return res.status(500).json({
            err: true,
            message: err.message
        })
        console.log(result)
        res.json(result)
    })
    
}


function show(req, res){
    const {id} = req.params
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

}


function store(req, res){
    const {id} = req.params

    const {name, text, vote} = req.body


    const sql = 'INSERT INTO reviews (movie_id, name, text, vote) VALUES (?, ?, ?, ?)'
    connection.execute(sql, [id, name, text, vote], (err, result) => {
        if (err) return res.status(500).json({
            error: true,
            message: err.message
        })


        res.status(201).json({
            message: 'Added success',
            review: {
                id: result.insertId,
                movie_id: id,
                name,
                vote,
                text
            }
        })
    })
}


module.exports = {
    index,
    show,
    store
}