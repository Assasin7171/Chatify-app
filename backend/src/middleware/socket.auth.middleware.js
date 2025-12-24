import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const socketAuthMiddleware = async (socket, next) => {
    try {
        const token = socket.handshake.headers.cookie?.split("; ")
            ?.find((row) => row.startsWith("jwt="))
            ?.split("=")[1];

        if(!token){
            console.log("Socket connection rejected: No token provided.");
            return next(new Error("Unauthorized - No token provided."));
        }

        //verify token here
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!decodedToken){
            console.log("Socket connection rejected: Invalid token.");
            return next(new Error("Unauthorized - Invalid token."));
        }


        //find user in db
        const user = await User.findById(decodedToken.id).select("-password");
        if(!user){
            console.log("Socket connection rejected: User not found.");
            return next(new Error("Unauthorized - User not found."));
        }

        //attach user info to socket
        socket.user = user;
        socket.userId = user._id.toString();

        console.log(`Socket authenticated for user: ${user.fullName} ${user._id}`)

        next();
    } catch (e) {
        console.log("Error in socket authentication: ", e.message);
        next(new Error("Unauthorized - Invalid token."));
    }
};