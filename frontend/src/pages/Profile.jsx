import React from "react";
import logo from "../assets/logo.webp";
import { IoCameraOutline } from "react-icons/io5";
import { useSelector,useDispatch } from "react-redux";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { login } from "../redux/userSlice";
const Profile = () => {
  let { user } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [name, setName] = useState(user?.name || "");
  let [frontendimage, setFrontendimage] = useState(user?.image || logo);
  let [backendimage, setBackendimage] = useState(null);
  let image = useRef();
  let [saving, setSaving] = useState(false);
  const handleimage = (e) => {
    let file = e.target.files[0];

    setBackendimage(file);
    setFrontendimage(URL.createObjectURL(file));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let formData = new FormData();
      formData.append("name", name);
      if (backendimage) {
        formData.append("image", backendimage);
      }
      let result = await axios.put(`${serverUrl}/api/user/profile`, formData, {
        withCredentials: true,
      });
      dispatch(login(result.data.user));
      navigate("/");
      setSaving(false);
      setName("");
    } catch (error) {
      console.log(error);
      setSaving(false);
    }
  };
  return (
    <div className="w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center">
      <div className="fixed top-[20px] left-[20px]">
        <IoArrowBackSharp
          className=" w-[40px] h-[40px] cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      <div
        className="w-[200px] h-[200px] bg-white rounded-full border-4 border-[#20c7ff] shadow-gray-400 shadow-lg relative  flex justify-center items-center cursor-pointer"
        onClick={() => image.current.click()}
      >
        <div className="w-[100%] h-[100%]    ">
          <img
            src={frontendimage}
            alt=""
            className="w-full h-full object-cover rounded-full  "
          />
        </div>
        <div className="absolute  right-1 bottom-6 text-3xl text-gray-700 bg-[#20c7ff] w-[30px] h-[30px] rounded-full flex justify-center items-center shadow-gray-400 shadow-lg ">
          <IoCameraOutline className=" right-1 bottom-6 text-3xl text-gray-700  " /></div>
      </div>
      <form
        className="flex flex-col gap-4 mt-6 w-[400px] justify-center items-center "
        onSubmit={handlesubmit}
      >
        <input
          type="file"
          accept="image/*"
          ref={image}
          hidden
          onChange={handleimage}
        ></input>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-[90%] h-[50px] border-2 border-[#20c7ff] px-4 py-2 rounded-lg  shadow-gray-400 shadow-lg bg-white"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="text"
          value={user?.username || ""  }
          readOnly
          className="w-[90%] h-[50px] border-2 border-[#20c7ff] px-4 py-2 rounded-lg  shadow-gray-400 shadow-lg  bg-white  text-gray-400"
        ></input>
        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="w-[90%] h-[50px] border-2 border-[#20c7ff] px-4 py-2 rounded-lg  shadow-gray-400 shadow-lg  bg-white text-gray-400"
        ></input>
        <button className="sm: px-6 sm:px-8 md:px-7 py-1 sm:py-3 md:py- rounded-2xl cursor-pointer bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 text-white font-semibold text-sm sm:text-base md:text-lg shadow-xl shadow-violet-500/40 transition-all duration-300 hover:scale-105 hover:shadow-violet-400/70 active:scale-95
        " disabled={saving}>
          {saving ? "Saving..." : "Save profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
