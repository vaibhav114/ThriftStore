import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"
const ProfilePage =()=>{
    const {user} = useContext(UserContext)
    const [npass,setNpass] = useState({
        password:""
    })
    const navigate = useNavigate()
    const handleChange=async(e)=>{
        setNpass({password:e.target.value})
    }
    const handleClick = async()=>{
        if(npass.password!=="")
        {
            try {
                const response = await axios.patch("/items/updatepass",npass)
                if(response.status ===200)
                {
                    Swal.fire({
                        title: "Update Done",
                        text: "Password Updated Successfull",
                        icon: "success"
                      });
                }
                    navigate('/login')
                    window.location.reload();
            } catch (error) {
                console.log(error)
            }

        }
        if(npass.password==="")
        {
            Swal.fire({
                title: "Failed",
                text: "Enter Password",
                icon: "error"
              });
        }
    }
    return <div className="mb-96 mt-20 ml-36 mr-36">
        <div>
            <div className="flex items-center">
                <h2 className="text-2xl tracking-wider font-semibold">User Name : </h2>
                <h2 className="text-2xl tracking-wider font-semibold ml-6" >{user?.name}</h2>
            </div>
            {/* <h1 className="text-3xl mt-10 flex justify-center tracking-wider font-bold">Update Password</h1> */}
            <div className="mt-12 flex  gap-3 items-center">
                <h1 className="tracking-wider text-2xl font-semibold">New Password : </h1>
                <input type="password" placeholder="New Password" name="npass" className="border border-gray-300 p-2 w-64" onChange={handleChange}/>
            </div>
            <div className="mt-8 flex justify-center">
                <button onClick={handleClick} className="border cursor-pointer bg-green-400  pt-3 pb-3 rounded-2xl pl-10 pr-10">Update Password</button>
            </div>
        </div>
    </div>
}

export default ProfilePage