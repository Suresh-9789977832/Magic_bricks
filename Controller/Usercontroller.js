import usermodel from "../model/Usermodal.js"
import bcryptjs from "bcryptjs"
import { comparepassword, createtoken } from "../Routes/Helper/helper.js";
import extpath from "path"
import fs from "fs"
import jwt from 'jsonwebtoken'

export const signup = async(req,res) => {
    const { username, email, password } = req.body;
    try {
        if (username && email && password) {
            const hashedpassword = bcryptjs.hashSync(password, 10)
            await usermodel.create({ username, email, password: hashedpassword })
            res.status(201).json("user created successfully")
        }
        else {
            res.status(400).send({
                
                message:"Fill all the field"
            })

        }

    } catch (error) {
        res.status(500).json(error.message)
    }

}
    

 export const loginuser = async(req,res) => {
    try {
        let email = req.body.email
        let password = req.body.password
        
        if (email && password) {
            const checkuser = await usermodel.findOne({ username: email }) || await usermodel.findOne({ email: email })
            
            if (checkuser) {
                if (await comparepassword(password, checkuser.password)) {
                    const token = await createtoken({ email: checkuser.email, username: checkuser.username, id: checkuser._id,fullname:checkuser.fullname })
                    const { password, ...finaldata } = checkuser._doc
                    res.cookie('token',token,{httpOnly:true}).status(200).send({
                        message:"User login successfull",
                        finaldata,
                        token
                    })
                }
                else {
                    res.status(400).send({
                        message:'Invalid password'
                    })
                }
            }
            else {
                res.status(400).send({
                    message:'Enter valid email id'
                })
            }
            
        }
        else {
            res.status(400).send({
                message:"Fill all the field"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}

export const uploadfile = async(req,res) => {
    const fileuploads = []
    for (let i = 0; i < req.files.length;i++){
        const { originalname, path } = req.files[i]
        const ext = extpath.extname(originalname)
        const newpath = path + ext
        fs.renameSync(path, newpath)
        fileuploads.push(newpath.replace('upload/', ""))
    }
    res.json(fileuploads)
}


export const refreshuser = async (req, res) => {
    try {
        let token = req.params.token
        if (token) {
            await jwt.verify(token, process.env.SECRET_CODE, (err, data) => {
                if (err) {
                    res.status(498).send({
                        message:"Token expired"
                    })
                }
                else {
                    res.json(data)
                }
            })
        }
        else {
            res.status(401).send({
                message:'no token'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}



export const changeuser = async (req, res) => {
    try {
        let token = req.params.token
        if (token) {
            await jwt.verify(token, process.env.SECRET_CODE, async(err, data) => {
                if (err) {
                    res.status(498).send({
                        message:"Token expired"
                    })
                }
                else {
                    let { username, password, email } = req.body
                    const hashedpassword = bcryptjs.hashSync(password, 10)
                    const finaldata = await usermodel.findById({ _id: data.id })
                    finaldata.set({ username, email, hashedpassword })
                    await finaldata.save()
                    res.json('updated successfully')
                }
            })
        }
        else {
            res.status(401).send({
                message:'no token'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}

