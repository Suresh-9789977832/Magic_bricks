
import express from 'express'
import { createposts, deletepost, edituserpost, finduserposts, getallpost, getpostbyid} from '../Controller/Postcontroller.js'

const postrouter = express.Router()
 

postrouter.post("/createpost/:token", createposts)

postrouter.get("/getallpost/:token",getallpost)

postrouter.get("/getbyid/:token/:id",getpostbyid)

postrouter.get("/finduserposts/:token", finduserposts)

postrouter.delete('/deleteuserpost/:id', deletepost)

postrouter.put('/edituserpost/:token/:id', edituserpost)





export default postrouter