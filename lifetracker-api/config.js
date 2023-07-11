require("dotenv").config()
require("colors")


const PORT = process.env.PG_PORT ? Number(process.env.PG_PORT) : 3001
const SECRET_KEY = process.env.SECRET_KEY ||  "secret-dev"


// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  const dbUser = process.env.PG_USER || "postgres"
  const dbPass = process.env.PG_PASS ? encodeURI(process.env.PG_PASS) : "postgres"
  const dbHost = process.env.PG_HOST || "local"
  const dbPort = process.env.PG_PORT || 5432
  const dbName = process.env.PG_DATABASE || "lifetracker"


  return process.env.PG_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}

const BCRYPT_WORK_FACTOR =  13

console.log("LifeTracker:".red)
console.log("PORT:".blue, PORT)
console.log("BCRYPT_WORK_FACTOR".blue, BCRYPT_WORK_FACTOR)
console.log("Database:".blue, getDatabaseUri())
console.log("---")

module.exports = {
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
  SECRET_KEY
}