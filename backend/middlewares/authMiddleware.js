import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const verifyToken = (req, res, next) =>
{
    let token;
    let authHeader = req.headers.authorization;
    console.log("Authorization header:", authHeader);
    if(authHeader && authHeader.startsWith("Bearer"))
    {
        token = authHeader.split(" ")[1]; //0th index has Bearer and 1st index has the token.
        console.log("Token found:", token);
        if(!token)
        {
            return res
                .status(401)
                .json({message: "Unauthorized, no token provided"});
        }

        try{
            const decode = jwt.verify(token, "jwt-secret-key");
            req.user = decode;
            console.log("The decoded user is:", req.user);
            next();
        }
        catch(err)
        {
            console.error("Token verification error:", err);
            return res.status(400).json({message: "Unauthorized, invalid token"});
        }
    }
}   

export default verifyToken;
