import dotenv from "dotenv"
import express from "express"
import connectDB from "./db/connetdb.js"

dotenv.config({
    path:'./env'
})

const app = express()
const port = process.env.PORT || 4000
connectDB();

app.get("/", (req, res) => {
    res.send("Server is on")
})


// some change are occurs
app.get("/api/food", (req, res) => {
    res.send("This is food end point")
})

app.listen(port, () => {
    console.log("Server is on ")
})