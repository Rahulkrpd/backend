import express from "express"

const app = express()
const port = 4000

app.get("/", (req, res) => {
    res.send("Server is on")
})


// some change are occurs
app.get("/api/food",(req,res)=>{
    res.send("This is food end point")
})

app.listen(port, () => {
    console.log("Server is on ")
})