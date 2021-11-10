const express = require('express')
const cors = require('cors')



const app = express()

// settings
app.set('port', process.env.PORT || 4000)

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

// routes
app.use('/api/users', require('./routes/users'))
app.use('/api/notes', require('./routes/notes'))

module.exports = app