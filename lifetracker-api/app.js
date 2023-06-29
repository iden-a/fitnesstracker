const express = require ('express')
const cors = require ('cors')
const morgan = require ('morgan')
const bcrypt = require ('bcrypt')
const pool = require('./database')

const app = express ()

app.use(cors())

app.get('/', (req, res) => {
    res.send({ping: 'pong'})
})

app.use(morgan('tiny'))
app.use(express.json())

const PORT = process.env.port || 3001

module.exports = app