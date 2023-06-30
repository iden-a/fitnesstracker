const app = require("./app");

const PORT = process.env.port || 3001

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})