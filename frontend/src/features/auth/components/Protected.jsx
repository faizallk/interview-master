import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export default function Protected({children}) {
 const {loading, user} = useAuth();

 if(loading) return null;

 if(!user){
    return <Navigate to={'/login'} /> 
 }
  return children
}
