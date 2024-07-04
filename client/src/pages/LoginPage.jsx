import axios from "axios"
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import {useNavigate ,Link} from 'react-router-dom'

const LoginPage =()=>{

  const [logData,setLogData] = useState({
    email:'',
    password:''
  })
 const {user,setUser} = useContext(UserContext)

  const navigate = useNavigate()
  const handleChange =(e)=>{
    setLogData({...logData,[e.target.name]:e.target.value})
   }


   async function handleSubmit(e){
    e.preventDefault()
    try {
      const {data}= await axios.post('/auth/login',logData)
      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
      console.log("Initiaal Login " + data.token)
      setUser(data)
      console.log("User "+ user.userId)
      navigate('/')
    } catch (error) {
      // console.log(error.response.data.msg)
      if (error.response) {
        console.log('Server responded with status:', error.response.status);
        alert(error.response.data.msg);
      } else if (error.request) {
        console.log('No response received from the server:', error.request);
      } else {
        console.log('Error during request setup:', error.message);
      }


    }
   }
   

    return <div>
      <div>

<div className="flex ">
<div className="" >
<div className="ml-32 mt-8">
  <img src="/logo.png" alt="LOGO" className="w-32" />
</div>
<div className="mt-8 ml-32">
  <h2 className="font-bold text-2xl">Sign In</h2>
  <h3 className="tracking-wider font-semibold mt-2">Nice to see you again </h3>
</div>
<form action="" className="ml-32 mt-6  mr-64"  onSubmit={handleSubmit}>
          <div className=" ">
            <div className="mt-6">
            <h3>Email * </h3>
            <input type="text" className="mt-4 p-2  border border-gray-300 rounded-md w-72" placeholder="EMAIL" name="email" value={logData.email} onChange={handleChange}/>
            </div>
            <div className="mt-6">
              <h3>Password *</h3>
            <input type="password" className="mt-4 p-2  border border-gray-300 rounded-md w-72" placeholder="PASSWORD" name="password" value={logData.password} onChange={handleChange}/>
            </div>
            <div className="mt-6 flex justify-between">
              <div className="flex">
             <input type="checkbox"  className=""/>
             <h5 className="ml-2">Remember Me</h5>
              </div>
             <h6 className="underline cursor-pointer">Forget Password? </h6>
            </div>
             <div className="mt-6 flex justify-center">
            <button className="border p-2 pl-6 pr-6 bg-green-400">Sign In </button>
            </div>
            <div className="mt-5">
              Don't have an Account ? {""}
              <Link to={"/register"} className="text-black font-bold  ml-2">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
</div>

<div className="grow h-screen">
<img src="/regpage3.jpg" alt="Register Display " className="w-full h-full object-cover" />
</div>


</div>
</div>
    </div>
}

export default LoginPage;