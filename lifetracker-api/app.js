const express = require ('express')
const cors = require ('cors')
const morgan = require ('morgan')
const bcrypt = require ('bcrypt')
const authRoutes = require("./routes/auth")


const pool = require('./database')

const app = express ()

//middleware
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json()) // req.body 

app.use("/auth", authRoutes)

app.get('/', (req, res) => {
    res.send({name: 'iden'})
})

app.post('/register', (req, res) => {
    res.send({name: 'iden'})
})



//ROUTES


//Register a user , create a user 

//Allow a user to log in



const PORT = process.env.port || 3001

module.exports = app