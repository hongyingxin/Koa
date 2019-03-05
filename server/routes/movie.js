const Router = require('koa-router')
const mongoose = require('mongoose')
const router = new Router();
const { controller,get,post,put} = require('../lib/decorator')

@controller('/api/v0/movies')
export class movieController {
    @get('/')
    async getMovies(ctx, next) {
        const Movie = mongoose.model('Movie')
        const movies = await Movie.find({}).sort({
            'meta.createdAt': -1
        })

        ctx.body = {
            movies
        }
    }

    @get('/:id')
    async getMoviesDetail(ctx, next){
        const id = ctx.params.id
        const Movie = mongoose.model('Movie')
        const movies = await Movie.findOne({ _id: id })
    
        ctx.body = {
            movies
        }
    }
}
