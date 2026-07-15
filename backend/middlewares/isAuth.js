import jwt from "jsonwebtoken"
const isAuth=async(req,res,next)=>{
    try{
        const token=req.cookies.token
        if(!token){
            return res.status(401).json({message:"unauthorized"})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.userId=decoded.id
        next()
    }catch(error){
        res.status(500).json({message:"isAuth Server Error"})
    }
}

export default isAuth