import React from "react";
import { useSelector } from "react-redux";
import logo from "../assets/logo.webp";
import { IoIosSearch } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
const Sidebar = () => {
  let { user, otherusers } = useSelector((state) => state.user);
  console.log(otherusers);
  let [search, setSearch] = useState(false);
  return (
    <div className="lg:w-[30%] w-full h-full bg-slate-200">
      <div className="w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg  ">
        <div className="flex items-center justify-between  pt-9 px-4">
          <div>
            <h1 className="text-2xl font-bold text-white">convoAI</h1>
            <h1 className="text-[20px] font-bold text-gray-800 ">
              Hii, {user?.name}
            </h1>
          </div>

          <div className=" rounded-full object-cover m-5 shadow-gray-400 shadow-lg ">
            <img
              src={user?.image || logo}
              className="w-[80px] h-[80px] rounded-full object-cover"
              alt=""
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
           {!search && <div className=" w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center shadow-gray-400 shadow-lg m-5"
        onClick={()=>setSearch(true)}>
          <h1 className="text-2xl text-black ">
            <IoIosSearch  className="cursor-pointer"/>
          </h1>
        </div>
        }
        {search && 
        <form className=" h-[50px] bg-white rounded-full flex items-center justify-center shadow-gray-400 shadow-lg m-5 px-5"> 
           <IoIosSearch  />
            <input type="text" placeholder="search users.." className="w-full h-full px-3 outline-0" />
            <RxCross1 className="cursor-pointer" onClick={()=>setSearch(false)} />
        </form>
        }
        </div>
        <div className="flex items-center justify-center">
          <div className=" rounded-full object-cover flex flex-wrap w-full m-5 shadow-gray-400 shadow-lg ">
            <img
              src={user?.image || logo}
              className="w-12 h-12 rounded-full object-cover rounded-full object-cover"
              alt=""
            />
          </div>
          {otherusers?.map((user) => (
             <div className=" rounded-full object-cover flex flex-wrap w-full m-5 shadow-gray-400 shadow-lg ">
            <img
              src={user?.image || logo}
              className="w-12 h-12 rounded-full object-cover rounded-full object-cover"
              alt=""
            />
          </div>
            
          ))}
        </div>
       
        
      </div>
    </div>
  );
};

export default Sidebar;
import React from 'react'

const MessageArea = () => {
  return (
    <div className='lg:w-[70%] hidden lg:block w-full h-full bg-slate-300 border-l-2 border-gray-300'>MessageArea</div>
  )
}

export default MessageArea