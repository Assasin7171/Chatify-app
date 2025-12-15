//next pozwala wywołać następną drugą metodę w
//router.put("/update-profile", protectRoute, updateProfile)
import jwt, {decode} from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) return res.status(401).send({message: "Unauthorized - No token provided."});

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) return res.status(401).send({message: "Unauthorized - Invalid token."});

        const user = await User.findById(decodedToken.userId).select("-password");
        if (!user) return res.status(401).send({message: "User not found."});

        req.user = user;
        next();
    } catch (err) {
        console.log("Error in protectRoute", err);
        res.status(500).send({message: "Internal Server Error."});
    }
};