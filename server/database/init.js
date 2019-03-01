const mongoose = require('mongoose')
const db = 'mongodb://localhost/douban-trailer'
const glob = require('glob')
const { resolve } = require('path')

mongoose.Promise = global.Promise

exports.initSchemas = () => {

var a = glob.sync(resolve(__dirname,'./schema','**/*.js'))

    try{
        glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(
            require
            )
    }catch(err){
        console.log(err)
    }
    
}

exports.connect = () => {

    let maxConnectTimes = 0

    return new Promise((resolve,reject) => {
        if(process.env.NODE_ENV !== 'production'){

            if(process.env.NODE_ENV !== 'production'){
                mongoose.set('debug',true)
            }
        
            mongoose.connect(db)
        
            mongoose.connection.on('disconnected', () => {
                if(maxConnectTimes < 5){
                    mongoose.connect(db)
                }else{
                    throw new Error('数据库故障')
                }
            
            })
        
            mongoose.connection.on('error', err => {
                maxConnectTimes++

                if(maxConnectTimes < 5){
                    mongoose.connect(db)
                }else{
                    throw new Error('数据库故障')
                }
            })
        
            mongoose.connection.once('open', () => {

                // const Dog = mongoose.model('Dog',{name:String})
                
                // const doga = new Dog({name:'阿尔法'})

                // doga.save().then(() => {
                //     console.log('wang')
                // })

                resolve()
                console.log("数据库打开成功")
            })
        }
    })
}