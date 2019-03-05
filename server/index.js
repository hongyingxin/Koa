const Koa = require('koa')
const mongoose = require('mongoose')
const app = new Koa();
const { connect ,initSchemas} = require('./database/init')
const router = require('./routes')
// const { normal} = require('./tpl')


;(async () => {
    await connect();

    initSchemas()

    // require('./tasks/movie')
    require('./tasks/api')
})()


app.use(async (ctx,next) => {
    ctx.type = 'text/html; charset=utf-8'
    ctx.body = '测试'
})

app.listen(8765)