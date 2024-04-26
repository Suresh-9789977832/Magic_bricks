import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import postmodal from "../model/Postmodal.js"



export const createposts = async (req,res) => {
    const { address, bathrooms, bedrooms, description,
        furnished ,imgurls,name,parking,regularprice,type,owner
    } = req.body.formdata
    const token = req.params.token
    try {
        
        if (token) {
            await jwt.verify(token, process.env.SECRET_CODE,async (err, data) => {
                if (err) return res.status(400).send({ message: "Token expired" })
                else {
                    let final=await postmodal.create({address, bathrooms, bedrooms, description,
                        furnished, imgurls, name, parking, regularprice, type, owner: data.id
                    })
                    res.status(201).send({
                        message: "Post created",
                        final
                    })
                    
                }
            })
        } else {
            res.status(400).send
                ({ message: "no token" })
        }

        
        
    } catch (error) {
        res.status(500).send({
            message: "Internal seriver error",
            errormessage:error.message
        })
    }
}

export const getallpost=async(req,res)=>{
    const token = req.params.token
    try {
        if (token) {
            await jwt.verify(token, process.env.SECRET_CODE, async(err, data) => {
                if (err) {
                    res.status(401).send({
                        message: "Jwt expired"
                    }) 
                }
                else {
                    let data = await postmodal.find()
                    res.json(data)
                }
            })
        }
        else {
            res.status(400).send('no token')
        }  
    } catch (error) {
        res.status(500).send({
            message: "Internal seriver error",
            errormessage:error.message
        })
    }
   
    
    
}

export const getpostbyid = async (req, res) => {
    try {
        let token = req.params.token
        let id = req.params.id
        await jwt.verify(token, process.env.SECRET_CODE, async(err, data) => {
            if (err) {
                res.status(401).send({
                    message: "Jwt expired"
                }) 
            }
            else {
                let finaldata = await postmodal.findById({_id:id })
                res.json(finaldata)
            }
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal seriver error",
            errormessage:error.message
        })
    }
}

export const finduserposts = async (req, res) => {
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
                  
                    const { id } = data

                    let userspost = await postmodal.find({ owner: id})
                    res.json(userspost)
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

export const deletepost = async (req, res) => {
    try {
        let id = req.params.id
        await postmodal.deleteOne({_id:id})
        res.json('post deleted')
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        }) 
    }
}





export const edituserpost = async (req,res) => {
    
    let { id, token } = req.params

    const { address, bathrooms, bedrooms, description,
    furnished ,imgurls,name,parking,regularprice,type,
    } = req.body.formdata
    try {
        if (token) {
            await jwt.verify(token, process.env.SECRET_CODE, async (err, data) => {
                if (err) {
                     res.status(498).send({
                     message: "Token expired"})
                }
                else {
                    await postmodal.findByIdAndUpdate(id,{address,bathrooms, bedrooms, description,
                          furnished ,imgurls,name,parking,regularprice,type,owner:data.id})
                    res.status(200).send({
                             message:"Post edited"
                         })
                }
            })
        }
    }
    catch (error) {
        res.status(500).send({
        message: "Internal server error",
        errormessage:error.message
    })
    }
    
}
