import express from "express"
import mongoose from "mongoose"
import userRoute from './routes/userRoute.js'
import userStatus from './routes/userStatus.js'
import config from "config"
import error from './middlewares/error.js'

//mongodb
mongoose.connect("mongodb://localhost/dsa")
    .then(() => console.log("Connected to mongodb ..."))
    .catch(() => console.log("Couldn't connect"))

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined')
    process.exit(1)
}

//express
const app = express()
//used middlewares
app.use(express.json())
app.use("/api/leetcode",userRoute)
app.use("/api/leetcode", userStatus)
app.use(error)

let port = process.env.port || 4000
app.listen(port, console.log(`listening on port ${port} ...`))