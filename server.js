const express = require('express')
const app = express()
const PORT = process.env.PORT
const movieRouter = require('./routes/moviesRouters')
const cors = require('cors')
const notFound = require('./middleware/notFound')
const serverError = require('./middleware/serverError')

app.use(express.json())

app.use(cors())

app.use(express.static('public'))



app.listen(PORT, () => {
    console.log(`Server is listening on http://127.0.0.1:${PORT}`)
})


app.get('/', (req, res) => {
    res.send('Welcome to my Movie API')
})


app.use('/api/movies', movieRouter)


app.use(serverError)
app.use(notFound)




