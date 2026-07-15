import jwt from "jsonwebtoken"
const gentoken=async (id)=>{
    try{
        const token= await jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"7d"});
        return token

    }catch(error){
        console.log(error);
    }

}
export default gentoken