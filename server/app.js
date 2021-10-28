var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const listEndPoinst = require('express-list-endpoints')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../views')))
app.use(express.static(path.join(__dirname, '../assets')))

// Routes
// routes will go here
app.get('/', (req, res) => {
  res.send('Server working ')
})
// list all endpoints
console.log('listEndPoinst ', listEndPoinst(app))
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log('no route found')
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    message: { err: 'An error occurred' }
  }
  const errorObj = Object.assign({}, defaultErr, err)
  console.log(errorObj.log)

  return res.status(500).send('Internal Server Error')
})

module.exports = app
