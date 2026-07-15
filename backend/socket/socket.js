import http from "http";
import express from "express";
import { Server } from "socket.io";

let app=express();

const server=http.createServer(app);

const io=new Server(server,{
  cors:
  {origin:
  "http://localhost:5173"
}});
 const userSocketMap={}
 export const getreceviersocketid=(recevier)=>{
   return userSocketMap[recevier]
 }
io.on("connection", (socket) => {
  const userId = socket.handshake.query.id;
  if(userId!==undefined){
  userSocketMap[userId] = socket.id;
  }

 io.emit("getonlineusers",Object.keys(userSocketMap));
 socket.on("disconnect", () => {
  delete userSocketMap[userId];
  io.emit("getonlineusers",Object.keys(userSocketMap));
 });
});

export{app,server,io }