import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({children})=>{
  const activeUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()

  useEffect(()=>{
    if(!activeUser) navigate('/')
  }, [])

  return(
   <>

   {activeUser ? children : null}
   
   </>
  )
}

export default ProtectedRoute