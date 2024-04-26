import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { env } from "../env";
import { json, useNavigate } from "react-router-dom";

export const Usercontext = createContext()

function Usercontextprovider({ children }) {

    const [user, setuser] = useState({})
    const [istoken, setistoken] = useState(false)
    const navigate=useNavigate()

    const token = (sessionStorage.getItem('token'))

    function logout() {
        sessionStorage.removeItem('token')
        setuser(null)
        setistoken(false)
        navigate('/sign-in')

    }

    useEffect(() => {
        const getuser = async () => {
            try {
                let res = await axios.get(`${env.BASE_URL}/user/refreshuser/${token}`)
                setuser(res.data)
                setistoken(true)
           } catch (error) {
            if (error?.response?.status == 401) {
                logout()
              }
              if (error?.response?.status === 500) {
                  logout()
              }if (error?.response?.status == 498) {
                  logout()
                }
           }
        } 
        getuser()
        
    },[])

console.log(user)

    return <Usercontext.Provider value={{user,setuser,setistoken,istoken,logout}}>
        {children}
    </Usercontext.Provider>
}


export default Usercontextprovider



