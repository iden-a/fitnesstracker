require("dotenv").config()
require("colors")


const PORT = process.env.PORT ? Number(process.env.PORT) : 3001
const SECRET_KEY = process.env.SECRET_KEY ||  "secret-dev"


// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  const dbUser = process.env.PG_USER || "postgres"
  const dbPass = process.env.PG_PASS ? encodeURI(process.env.PG_PASS) : "postgres"
  const dbHost = process.env.PG_HOST || "local"
  const dbPort = process.env.PG_PORT || 5432
  const dbName = process.env.PG_DATABASE || "lifetracker"


  return process.env.DATABASE_URL || `postgres://lifetrackerdb_dgdm_user:VaV93EL8w3e3Rixm3hEVdZGP5OkzoLiC@dpg-cikcj6tgkuvinfijs4q0-a/lifetrackerdb_dgdm`
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