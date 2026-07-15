import React, { useState } from "react";
import { useSelector } from "react-redux";
import logo from "../assets/logo.webp";
import { IoIosSearch } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { SlLogout } from "react-icons/sl"
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import axios from "axios";
import { serverUrl } from "../main";
import { useNavigate } from "react-router-dom";
import { setSelectedUser } from "../redux/userSlice";

const Sidebar = () => {
  const { user, otherusers, selectedUser ,onlineusers} = useSelector((state) => state.user);

  const [search, setSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const filteredUsers = otherusers?.filter((item) =>
    item.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    item.username?.toLowerCase().includes(searchText.toLowerCase())
  );
  const handleLogout = async () => {
 
  try {
    await axios.get(`${serverUrl}/api/auth/logout`, {
      withCredentials: true,
    });

    dispatch(logout());
    navigate("/login");
    
  } catch (error) {
    console.log(error);
  }
};


  return (
    
<div
  className={`
    ${
      selectedUser ? "hidden" : "flex"
    } lg:flex lg:w-[30%] w-full h-screen bg-gray-100 border-r flex-col
  `}
>  

      {/* Header */}
      <div className="bg-[#20c7ff] rounded-b-[40px] shadow-lg">

        <div className="flex justify-between items-center p-5">

          <div>
            <h1 className="text-3xl font-bold text-white">
              ConvoAI
            </h1>

            <p className="text-lg font-semibold text-gray-900">
              Hi, {user?.name}
            </p>
          </div>

          <img onClick={()=>navigate("/profile")}
            src={user?.image || logo}
            alt=""
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
          />
 
        </div>

        {/* Search */}

        <div className="pb-5 flex justify-center">

          {!search ? (
            <button
              onClick={() => setSearch(true)}
              className="w-14 h-14 bg-white rounded-full flex justify-center items-center shadow-lg"
            >
              <IoIosSearch size={28} />
            </button>
          ) : (
            <div className="w-[90%] h-12 bg-white rounded-full flex items-center px-4 shadow-lg">
              <IoIosSearch />

              <input
                type="text"
                placeholder="Search users..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="flex-1 px-3 outline-none"
              />

              <RxCross1
                className="cursor-pointer"
                onClick={() => {
                  setSearch(false);
                  setSearchText("");
                }}
              />
            </div>
          )}

        </div>

      </div>

      {/* User List */}

      <div className="flex-1 overflow-y-auto p-3">

        {filteredUsers?.map((item) => (
        
          <div
            key={item._id}
            onClick={() => {
              dispatch(setSelectedUser(item));
            
            }}
            className="flex items-center gap-3 bg-white rounded-xl p-3 mb-3 shadow hover:bg-gray-100 cursor-pointer transition"
          >
            <img
              src={item.image || logo}
              alt=""
              className="w-14 h-14 rounded-full object-cover"
            />

            <div className="flex-1">

              <h2 className="font-semibold text-lg">
                {item.name}
              </h2>

              <p className="text-gray-500 text-sm">
                @{item.username}
              </p>

            </div>

            <div
  className={`w-3 h-3 rounded-full ${
    onlineusers.includes(item._id)
      ? "bg-green-500"
      : "bg-gray-400"
  }`}
/>

          </div>
        ))}
   
</div>
<div className="p-4 border-t bg-white shadow-md">
  <button
    onClick={handleLogout}
    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 transition duration-300"
  >
    <SlLogout size={20} />
    Logout
  </button>

      </div>

    </div>
  );
};

export default Sidebar;