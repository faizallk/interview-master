import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "./services/auth.api";


export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
    const getUser = async ()=>{
      try{
        const data = await getCurrentUser();
        setUser(data.user)
      } catch(err){
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    getUser()
  },[])
    return (
        <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}