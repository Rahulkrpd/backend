import dotenv from "dotenv"
import { app } from "./app.js"
import connectDB from "./db/connetdb.js"

dotenv.config({
    path: './.env'
})


const port = process.env.PORT || 4000
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is on port: ${port}`)
        })

    })
    .catch((error) => {
        console.log('MongoDb not load ', error)
    })



app.get("/", (req, res) => {
    res.send(`Server is on port: ${port}`)
})


// some change are occurs
app.get("/api/food", (req, res) => {
    res.send("This is food end point")
})

