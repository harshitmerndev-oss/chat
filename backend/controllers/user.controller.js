import uploadoncloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
export const getUser = async (req, res) => {
    try{
        let userId=req.userId
        let user=await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        return res.status(200).json({user:user})
    }catch(error){
        res.status(500).json({message:"getUser Server Error"});
    }   

};
export const editprofile=async(req,res)=>{
    try{
    let {name}=req.body
    let image;
    if(req.file){
      image=await uploadoncloudinary(req.file.path)

    }
    let user=await User.findByIdAndUpdate(req.userId,{
        name,
        image   

    },{new:true})
    if(!user){
        return res.status(400).json({message:"user not found"})
    }
    return res.status(200).json({user:user})
}
catch(error){
    res.status(500).json({message:"editprofile Server Error"});
}   
}
export const getotheruser=async(req,res)=>{
    try{
        let users=await User.find({_id:{$ne:req.userId}}).select("-password")
        return res.status(200).json({users:users})
    }catch(error){
        res.status(500).json({message:"getotheruser Server Error"});
        
    }
}
        
       