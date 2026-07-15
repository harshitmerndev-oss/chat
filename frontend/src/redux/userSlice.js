import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        otherusers:[],
        selectedUser:null,
        socket:null,
        onlineusers:[]

    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        setotherusers:(state,action)=>{
            state.otherusers=action.payload
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser=action.payload
        },
        setSocket:(state,action)=>{
            state.socket=action.payload
        },
       setOnlineUsers: (state, action) => {
    state.onlineusers = action.payload || [];
}

    },
});
export const { login, logout,setotherusers,setSelectedUser,setSocket,setonlineusers } = userSlice.actions;
export default userSlice.reducer;