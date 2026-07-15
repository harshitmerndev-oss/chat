import Conversation  from "../models/conversation.model.js";
import  Messages from "../models/message.model.js";
import uploadoncloudinary from "../config/cloudinary.js";
import { getreceviersocketid } from "../socket/socket.js";
import { io } from "../socket/socket.js";
export const sendMessage = async (req, res) => {
  try {
    let sender = req.userId;
    let { receiver } = req.params;
    let { message } = req.body;
    let image="";
    if (req.file) {
      image = await uploadoncloudinary(req.file.path);
    }
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    });

    let newmessage = await Messages.create({
      sender,
      receiver,
      message,
      image,
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
        messages: [newmessage._id],
      });
    } else {
      conversation.messages.push(newmessage._id);
      await conversation.save();
    }
    const recevierSocketid=getreceviersocketid(receiver)
  
    if (recevierSocketid) {
      io.to(recevierSocketid).emit("newMessage", newmessage);
    }
    res.status(201).json({
      success: true,
      newMessage: newmessage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "sendMessage Server Error" });
  }
};

export const getMessages = async (req, res) => {
    try{
        let sender=req.userId
        let {receiver}=req.params       
        let conversation=await Conversation.findOne({
            participants:{$all:[sender,receiver]}
        }).populate("messages")
     if (!conversation) {
    return res.status(200).json([]);
}
      return  res.status(200).json(conversation?.messages);
    }catch(error){
        res.status(500).json({message:"getMessages Server Error"});
    }
}