import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,  // only allow for specific frontend or 
        credentials: true
    }
))


app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"})) 
app.use(express.static("public"))

app.use(cookieParser())



app.get("/", (req, res) => {
    res.send(`Server is on port: ${port}`)
})


// some change are occurs
app.get("/api/food", (req, res) => {
    res.send("This is food end point")
})

export { app }