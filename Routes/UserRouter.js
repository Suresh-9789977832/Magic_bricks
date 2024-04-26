import express from 'express'
import {  changeuser, loginuser, refreshuser, signup, uploadfile } from '../Controller/Usercontroller.js'
import multer from 'multer'

const userRouter = express.Router()
 
const imgmiddleware = multer({ dest: "uploads" })

userRouter.post("/signup", signup)

userRouter.post("/login", loginuser)

userRouter.post("/upload", imgmiddleware.array("images"), uploadfile)

userRouter.get("/refreshuser/:token", refreshuser)

userRouter.put('/changeuser/:token',changeuser)

    








export default userRouter