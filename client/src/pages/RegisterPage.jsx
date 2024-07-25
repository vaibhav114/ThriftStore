import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const RegisterPage = () => {
  const [user, setUser] = useState({
    name: "",
    lname: "",
    email: "",
    password: "",
    otp: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleOtpSend = async (e) => {
    e.preventDefault();
    try {
      if (user.email == "") {
        alert("User cannot be empty");
        return;
      }
      const response = await axios.post("/auth/sendotp", { email: user.email });
      console.log(response);
    } catch (error) {
      console.log("otp Sent error");
    }
  };
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(user);
    try {
      await axios.post("/auth/register", user);
      // axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
      navigate("/login");
    } catch (error) {
      alert(error.response.data.msg);
    }
  }

  function googleNav(url) {
    window.location.href = url;
  }
  const generateUrl = async () => {
    const { data } = await axios.post("/googleAuth");
    googleNav(data.url);
  };
  return (
    <>
      <div>
        <div className="flex ">
          <div className="">
            <div className="ml-32 mt-8">
              <img src="/logo.png" alt="LOGO" className="w-32" />
            </div>
            <div className="mt-8 ml-32">
              <h2 className="font-bold text-2xl">Sign Up</h2>
              <h3 className="tracking-wider font-semibold mt-2">
                Fill your information below to register
              </h3>
            </div>
            <form className="ml-32 mt-6  mr-16" onSubmit={handleSubmit}>
              <div className=" ">
                <div className="flex gap-36">
                  <div>
                    <h3>First Name *</h3>
                    <input
                      type="text"
                      className="mt-4 p-2  border border-gray-300 rounded-md"
                      placeholder="Enter First Name"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <h3>Last Name *</h3>
                    <input
                      type="text"
                      className="mt-4 p-2  border border-gray-300 rounded-md"
                      placeholder="Enter Last Name"
                      name="lname"
                      value={user.lname}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex gap-36 mt-6">
                <div className=" ">
                  <h3>Email * </h3>
                  <input
                    type="text"
                    className="mt-4 p-2  border border-gray-300 rounded-md "
                    placeholder="EMAIL"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="">
                  <h3>Password * </h3>
                  <input
                    type="password"
                    className="mt-4 p-2  border border-gray-300 rounded-md"
                    placeholder="PASSWORD"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                  />
                </div>
                </div>

                <div className="flex gap-36  items-center">
                  <div className="mt-5">
                    <h3>OTP *</h3>
                    <input
                      type="text"
                      className="mt-4 p-2  border border-gray-300 rounded-md w-52"
                      placeholder="OTP"
                      name="otp"
                      value={user.otp}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mt-14">
                    <button
                      className="border p-2 pl-6 pr-6 bg-green-400"
                      onClick={handleOtpSend}
                    >
                      SEND{" "}
                    </button>
                  </div>
                </div>

              
                <div className="mt-6 flex justify-center">
                  <button className="border p-2 pl-6 pr-6 bg-green-400">
                    REGISTER
                  </button>
                </div>


                <div className="flex mt-5 justify-around mb-5 items-center">
                  <div className="">
                    Already A Member ? {""}
                    <Link to={"/login"} className="text-black font-bold  ml-2">
                      LOGIN
                    </Link>
                  </div>

                  <div>
                    <button type="button" onClick={() => generateUrl()}  className=" border p-2 pl-6 pr-6 flex items-center gap-2" >
                      
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="0.98em"
                        height="1em"
                        viewBox="0 0 256 262"
                      >
                        <path
                          fill="#4285f4"
                          d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                        />
                        <path
                          fill="#34a853"
                          d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                        />
                        <path
                          fill="#fbbc05"
                          d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                        />
                        <path
                          fill="#eb4335"
                          d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                        />
                      </svg>{"SIGN UP "}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="grow h-screen">
            <img
              src="/regpage3.jpg"
              alt="Register Display"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
