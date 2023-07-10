// require('dotenv').config()
const { Pool} = require('pg')
const {getDatabaseUri} = require ("./config")

const pool = new Pool ({
connectionString: getDatabaseUri(),
})

pool.connect((err) => {
    if (err) { console.log(err)
        console.error(("Connection error"))}
    else {
        console.log("Successfully connected to postgres database!")
    }
})
module.exports = pool