const puppeteer = require('puppeteer')

const base = `https://movie.douban.com/subject/`
const doubanId = '26739551'
const videoBase = `https://movie.douban.com/trailer/219491/`

const sleep = time => new Promise(resolve => {
    setTimeout(resolve,time)
})

;(async() => {
    console.log("开始任务")

    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        dumpio: false
    })

    const page = await browser.newPage();
    await page.goto(base + doubanId,{
        waitUntil: 'networkidle2'
    })
 
    await sleep(2000)

    const result = await page.evaluate(() => {
        var $ = window.$
        var it = $('.related-pic-video')

        if(it && it.length > 0){
            var link = it.attr('href')
            var cover = it.css("background-image").split("\"")[1]

            return{
                link,
                cover
            }
        }

        return {}
    })


    console.log("reslut  +++++++++++++")
    console.log(result)
    console.log("reslut  ++++++++++++++")

    /*爬取视频*/
    let video
    /*获取到链接   说明有地址*/
    if(result.link){
        await page.goto(result.link,{
            waitUntil: 'networkidle2'
        })

        await sleep(2000)

        video = await page.evaluate(() => {
            var $ = window.$
            var it = $('source');

            if(it && it.length > 0){
                return it.attr('src')
            }

            return ''
        })
    }

    const data = {
        video,
        doubanId,
        cover: result.cover
    }

    browser.close()

    process.send(data)
    process.exit(0)

})()