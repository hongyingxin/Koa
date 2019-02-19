const rp = require('request-promise-native')    //请求库

async function fetchMovie(item){
    const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`

    const res = await rp(url)

    return res
}

;(async () => {
    let movies = [
        { 
            doubanId: 4920389,
            title: '头号玩家',
            rate: 8.7,
            poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2516578307.jpg' 
        },
        { 
          doubanId: 1292052,
          title: '肖申克的救赎',
          rate: 9.6,
          poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p480747492.jpg'
        } 
    ]

    movies.map(async movie => {
        let movieDate = await fetchMovie(movie)

        try{
            movieDate = JSON.parse(movieDate)

            console.log(movieDate.tags)
            console.log(movieDate.summary)
            
        }catch(err){
            console.log(err)
        }


    })

})()