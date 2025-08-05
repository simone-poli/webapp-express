const notFound = (req, res, next) => {
    res.status(404).send('not found')
}


module.exports = notFound