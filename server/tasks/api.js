const rp = require('request-promise-native')    //请求库
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const Category = mongoose.model('Category')

async function fetchMovie(item){
    const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`

    const res = await rp(url)

    let body

    try {
        body = JSON.parse(res)
    } catch (error) {
        console.log(err)
    }

    return body
}

;(async () => {

    let movies = await Movie.find({
        $or:[
            { summary: { $exists: false}},
            { summary: null},
            { title: ''},
            { summary: ''}
        ]
    })

    for(let i = 0; i < [movies[0]].length;i++){
        let movie = movies[i]
        let movieDate = await fetchMovie(movie)

        console.log("+9+")
        console.log(movieDate)

        if(movieDate){
            let tags = movieDate.tags || []

            movie.tags = movie.tags || []
            movie.summary = movieDate.summary || []
            movie.title = movieDate.alt_title || movieDate.title || ''
            movie.rawTitle = movieDate.title || ''
        
            if(movieDate.attrs){
                movie.movieTypes = movieDate.attrs.movie_type || []
                movie.year = movieDate.attrs.year[0]

                for(let i = 0; i < movie.movieTypes.length; i++){
                    let item = movie.movieTypes[i]
                    let cat = await Category.findOne({
                        name: item
                    })

                    if(!cat){
                        cat = new Category({
                            name: item,
                            movies: [movie._id]

                        })
                    }else{
                        if(cat.movies.indexOf(movie._id) === -1){
                            cat.movies.push(movie._id)
                        }
                    }
                    await cat.save();

                    if(!movie.category){
                        movie.category.push(cat._id)
                    }else{
                        if(movie.category.indexOf(cat._id) === -1){
                            movie.category.push(cat._id)
                        }
                    }
                }


                let dates = movieDate.attrs.pubdate || []
                let pubdate = []

                dates.map(item => {
                    if(item && item.split('(').length > 0){
                        let parts = item.split('(')
                        let date = parts[0]
                        let country = '未知'

                        if(parts[1]){
                            country = parent[1].split(')')[0]
                        }

                        pubdate.push({
                            date: new Date(date),
                            country
                        })
                    }
                })

                movie.pubdate = pubdate
            }

            tags.forEach(tag => {
                movie.tags.push(tag.name)
            })

            await movie.save();
        }
    }
})()