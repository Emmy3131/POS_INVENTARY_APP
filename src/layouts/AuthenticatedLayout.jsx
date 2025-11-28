import Header from "../components/Header"
import Sidebar from "../components/sideBar"
import { Outlet } from "react-router-dom";
const AuthenticatedLayout = () => {
  return(
  <div>
      <Header /> 
      <Sidebar />
      <main className="ml-36 mt-[86px] p-6 relative max-w-[85%]">
       <Outlet />
      </main>
  </div>
  )
}

export default AuthenticatedLayout