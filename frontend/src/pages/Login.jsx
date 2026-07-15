import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";


const Login = () => {
  let navigate = useNavigate();
  const [show, setshow] = useState(false);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
let dispatch = useDispatch();

  const handlelogin = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true },
      );

      dispatch(login(result.data.user));
      
      navigate("/");
      setemail("");
      setpassword("");
      setloading(false);
      seterror("");
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.response?.data);
      setloading(false);
      seterror(error.response.data.message);
    }
  };
  return (
    <div className="w-full h-screen bg-slate-400 flex items-center justify-center">
      <div className="w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg ">
        <div className="w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center ">
          <h1 className="text-3xl font-bold">
            Login to
            <span className="text-white"> Convo</span>
            <span className="text-white">AI</span>
          </h1>
        </div>
        <div className="w-full  h-100 mt-[30px] p-8 ">
          <form
            className="flex flex-col  text-2xl font-2 gap-9 items-center "
            onSubmit={handlelogin}
          >
            <input
              className="w-[90%] h-[50px] border-2 border-[#20c7ff] px-4 py-2 rounded-lg  shadow-gray-400 shadow-lg "
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            ></input>
            <div className="w-[90%] h-[50px] relative overflow-hidden shadow-gray-400 shadow-lg">
              <input
                className="  h-full w-full border-2  border-[#20c7ff]  rounded-lg px-4 pr-14 "
                type={show ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              ></input>
              <span
                className="absolute  right-4 top-1/2 -translate-y-1/2  text-[20px] text-[#20c7ff] font-semibold cursor-pointer"
                onClick={() => setshow(!show)}
              >
                {show ? "hidden" : "show"}
              </span>
            </div>
            {error && <p className=" text-red-500 text-lg h-1 ">{error}</p>}

            <button
              className=" sm: px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 rounded-2xl cursor-pointer bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 text-white font-semibold text-sm sm:text-base md:text-lg shadow-xl shadow-violet-500/40 transition-all duration-300 hover:scale-105 hover:shadow-violet-400/70 active:scale-95"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
            <p className="text-[20px]">
              want to create an account?
              <span
                className="text-[#20c7ff] cursor-pointer px-1 "
                onClick={() => navigate("/signup")}
              >
                Signup
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
