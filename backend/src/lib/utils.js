import jwt from "jsonwebtoken";

export function generateToken(userId, res) {
    const {JWT_SECRET} = process.env;
    if (!JWT_SECRET) throw new Error("JWT SECRET is not configured");

    const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        sameSite: "strict", // CSRF protection
        secure: process.env.NODE_ENV === "development" ? false : true,
    });

    return token;
}
