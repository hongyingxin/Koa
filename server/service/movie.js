const mongoose = require('mongoose')


// $in   运算符匹配

export const getAllMovies = async (type, year) => {
    let query = {}

    if (type) {
        query.movieTypes = {
            $in: [type]
        }
    }

    if (year) {
        query.year = year
    }
    const Movie = mongoose.model('Movie')
    const movies = await Movie.find(query)

    return movies
}

export const getMoviesDetail = async (id) => {
    const Movie = mongoose.model('Movie')
    const movie = await Movie.findOne({ _id: id })
    return movie
}
export const getRelativeMovies = async (movie) => {
    const Movie = mongoose.model('Movie')
    const movies = await Movie.find({ 
        movieTypes:{
            $in: movie.movieTypes
        }
    })
    return movies
}