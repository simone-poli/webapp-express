const serverError = (err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send('something is broke')
}

module.exports = serverError