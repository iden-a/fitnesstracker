const express = require ('express')
const cors = require ('cors')
const morgan = require ('morgan')
const authRoutes = require("./routes/auth")
const security = require("./middleware/security")


const pool = require('./database')

const app = express ()

//middleware
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json()) // req.body 
app.use(security.extractUserFromJwt)

app.use("/auth", authRoutes)

app.get('/', (req, res) => {
    res.send({name: 'iden'})
})

app.post('/register', (req, res) => {
    res.send({name: 'iden'})
})



const PORT = process.env.port || 3001

module.exports = app