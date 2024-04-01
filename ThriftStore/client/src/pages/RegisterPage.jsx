import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

const RegisterPage = () => {
  const [user, setUser] = useState({
    name:"",
    lname:"",
    email:"",
    password:""
  })
  const navigate = useNavigate()
  const handleChange =(e)=>{
    setUser({...user,[e.target.name]:e.target.value}) 
  }

    async function handleSubmit(e){
      e.preventDefault()
      try {
          await axios.post('/auth/register',user)
          // axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
        navigate('/login')
      } catch (error) {
        alert(error.response.data.msg)
      }
    }
  return (
    <div>

      <div className="flex ">
      <div className="" >
      <div className="ml-32 mt-8">
        <img src="/logo.png" alt="LOGO" className="w-32" />
      </div>
      <div className="mt-8 ml-32">
        <h2 className="font-bold text-2xl">Sign Up</h2>
        <h3 className="tracking-wider font-semibold mt-2">Fill your information below to register</h3>
      </div>
        <form className="ml-32 mt-6  mr-16"  onSubmit={handleSubmit}>
          <div className=" ">
            <div className="flex gap-36">
              <div>
            <h3>First Name  *</h3>
            <input type="text" className="mt-4 p-2  border border-gray-300 rounded-md"  placeholder="Enter First Name" name="name"  value ={user.name} onChange={handleChange}/>
            </div>
            <div>
              <h3>Last Name *</h3>
            <input type="text" className="mt-4 p-2  border border-gray-300 rounded-md" placeholder="Enter Last Name" name="lname"  value ={user.lname} onChange={handleChange}/>
            </div>
            </div>  
            <div className="mt-6">
              <h3>Email * </h3>
            <input type="text" className="mt-4 p-2  border border-gray-300 rounded-md w-72" placeholder="EMAIL" name="email" value={user.email} onChange={handleChange}/>
            </div>
            <div className="mt-6">
              <h3>Password * </h3>
            <input type="password" className="mt-4 p-2 w-64  border border-gray-300 rounded-md" placeholder="PASSWORD" name="password" value={user.password} onChange={handleChange}/>
            </div>
            <div className="mt-6 flex justify-center">
            <button className="border p-2 pl-6 pr-6 bg-green-400">REGISTER</button>
            </div>
            <div className="mt-5">
              Already A Member ? {""}
              <Link to={"/login"} className="text-black font-bold  ml-2">
                LOGIN
              </Link>
            </div>
          </div>
        </form>

      </div>
      
      <div className="grow h-screen">
  <img src="/regpage3.jpg" alt="Register Display" className="w-full h-full object-cover" />
</div>


      </div>
       
    </div>
  );
};

export default RegisterPage;
