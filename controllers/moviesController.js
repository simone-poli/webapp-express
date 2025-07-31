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

}


module.exports = {
    index,
    show
}