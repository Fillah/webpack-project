import express from 'express'
import expressSession from 'express-session'
import expressValidator from 'express-validator'
import path from 'path'
import webpack from 'webpack'
import mongoose from 'mongoose'

const db = require('./config/db')
mongoose.connect(db.url)

const server = express()
const port = process.env.PORT || 8080;
const config = require('./webpack.config.js')
const compiler = webpack(config)
const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    config.devServer
)
const webpackHotMiddleware = require('webpack-hot-middleware')(compiler)

server.use(webpackDevMiddleware)
server.use(webpackHotMiddleware)
server.use(expressValidator())
server.use(expressSession({
	secret: process.env.SESSION_SECRET || 'secret',
	resave: false,
	saveUninitialized: false
}))

const staticMiddleware = express.static(path.join(__dirname, 'dist'))
const apiRoutes = require('./backend/routes/api.route.js')()

server.use('/api', apiRoutes)
server.use(staticMiddleware)

server.use(function (req, res) {
	res.header('Access-Control-Allow-Origin', '*')
})

server.listen(port, () => {
    console.log('server running on port ' + port)
})