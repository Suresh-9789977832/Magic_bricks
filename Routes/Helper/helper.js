import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"




export const comparepassword = async (password, hashedpassword)=>{
    const comparepass = await bcryptjs.compare(password, hashedpassword)
    return comparepass
}

export const createtoken = async (value) => { 
    const token = await jwt.sign(value, process.env.SECRET_CODE, { expiresIn: process.env.EXPIRE })
    return token
}




