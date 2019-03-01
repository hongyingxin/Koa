const Koa = require('koa')
const mongoose = require('mongoose')
const app = new Koa();
const { connect ,initSchemas} = require('./database/init')
// const { normal} = require('./tpl')


;(async () => {
    await connect();

    initSchemas()

    const Movie = mongoose.model('Movie')

    const movies = await Movie.find({})

    console.log(movies)
})()

app.use(async (ctx,next) => {
    ctx.type = 'text/html; charset=utf-8'
    ctx.body = '测试'
})

app.listen(4444)