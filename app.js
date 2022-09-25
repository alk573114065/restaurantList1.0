// require packages used in the project
const express = require('express')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000


// express-handlebars 
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))



// routes setting
app.get('/', (req, res) => {


  res.render('index', { restaurants: restaurantList.results })
 
})

// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword.toLowerCase().trim()
//   const restaurants = restaurantList.results.filter(restaurant => {
//     return restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) || restaurants.category.includes(keyword) || restaurants.name.toLowerCase().includes(keyword.toLowerCase())
//   })
//   res.render('index', { restaurants: restaurants, keyword: keyword })
// })

app.get('/search', (req, res) => {

  // use trim() to cut off the space
  const keyword = req.query.keyword.toLowerCase().trim()
  const restaurants = restaurantList.results.filter(restaurants => {
    return restaurants.name_en.toLowerCase().includes(keyword) || restaurants.category.includes(keyword)
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
  // res.send('this is my  web app')

})

app.get('/restaurants/:restaurant_id', (req, res) => {

  console.log('req.params.restaurant_id', req.params.restaurant_id)


  const restaurants = restaurantList.results.find(restaurants => restaurants.id.toString() === req.params.restaurant_id)

  res.render('show', { restaurants: restaurants })


})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})