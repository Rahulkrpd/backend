import express from "express"

const app = express()
const port = 4000

app.get("/", (req, res) => {
    res.send("Server is on")
})


app.listen(port, () => {
    console.log("Server is on ")
})