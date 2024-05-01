import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import userRouter from './Routes/UserRouter.js';
import { fileURLToPath } from 'url';
import path from 'path';
import postrouter from './Routes/PostRouter.js'
import cors from "cors"
const __dirname = path.dirname(fileURLToPath(import.meta.url));



const app = express()   
    
app.use(cors({
    origin: "http://localhost:5000",
    credentials:true
}))


mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`).then(() => {
    console.log("connected to MongoDB!")
})
    .catch((err) => {
    console.log(err)
})


app.use('/uploads',express.static(__dirname+'/uploads'))
app.use(express.json())
app.use('/user', userRouter)
app.use('/post',postrouter)



// app.get('/', (req, res) => {
//     res.json('user data') 
//  })

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})