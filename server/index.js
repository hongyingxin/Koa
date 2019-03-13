const Koa = require('koa')
const mongoose = require('mongoose')
const { resolve } = require('path')
const { connect, initSchemas } = require('./database/init')

const R = require('ramda')
const MIDDLEWARES = ['router','parcel']

    // const router = require('./routes')
    // const { normal} = require('./tpl')


    ; (async () => {
        await connect();

        initSchemas()

        // require('./tasks/movie')
        // require('./tasks/api')
    })()

const useMiddlewares = (app) => {
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWith => initWith(app)
            ),
            require,
            name => resolve(__dirname, `./middlewares/${name}`)
        )
    )(MIDDLEWARES)
}

async function start() {

    const app = new Koa();
    await useMiddlewares(app)
    app.listen(8765)
}

start();


