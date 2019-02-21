const Koa = require('koa')
const app = new Koa();
const { connect } = require('./database/init')
// const { normal} = require('./tpl')


;(async () => {
    await connect();
})()

app.use(async (ctx,next) => {
    ctx.type = 'text/html; charset=utf-8'
    ctx.body = '测试'
})

app.listen(2333)