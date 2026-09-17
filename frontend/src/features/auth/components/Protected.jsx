import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../../../components/Navbar";

export default function Protected({children}) {
 const {loading, user} = useAuth();

 if(loading) return null;

 if(!user){
    return <Navigate to={'/login'} />
 }
  return (
    <>
      <Navbar />
      <div className="pt-12">{children}</div>
    </>
  )
}
