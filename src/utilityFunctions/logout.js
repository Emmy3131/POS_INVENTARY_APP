import axios from "axios";

const baseUrl = "https://pos-inventory-api.vercel.app";

export const logoutUser = async (navigate) => {
  const token = localStorage.getItem("token");
  try {
    
      const res =  await axios.get(`${baseUrl}/api/v1/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     
     if(res.data.status === "success"){
       localStorage.removeItem("token");
       localStorage.removeItem("user");
       await new Promise((resolve) => setTimeout(resolve, 500));
       navigate("/");
     }

    
  } catch (error) {
    console.error("Logout Error:", error);
  }
};
