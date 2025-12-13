import {generateToken} from "../lib/utils.js";
import User from "../models/User.js";
import {sendWelcomeEmail} from "../emails/emailHandlers.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;

    try {
        if (!fullName) return res.status(400).json({message: "Please enter valid full name"});
        if (!email) return res.status(400).json({message: "Please enter valid email"});
        if (!password) return res.status(400).json({message: "Please enter password"});

        if (password.length < 6) {
            return res
                .status(400)
                .json({message: "Password must be at least 6 characters long"});
        }


        // Check if the email is valid: regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({message: "Invalid email format"});
        }

        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({message: "Email already in use"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser =
            new User({fullName, email, password: hashedPassword});

        if (newUser) {
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
            });


            try {
                await sendWelcomeEmail(savedUser.email, savedUser.email, process.env.CLIENT_URL)
            } catch (error) {
                console.log("Failed to send email:", error);
            }
        } else {
            return res.status(500).json({message: "Error creating user"});
        }
    } catch (error) {
        console.log("Error in signup controller:", error);
        res.status(500).json({message: "Server error"});
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) return res.status(400).json({message: "Email and password are required"});

    try {
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: "Invalid credentials"});

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.error("Error in login controller:", error);
        res.status(500).json({message: "Server error"});
    }
}

export const logout = (req, res) => {
    res.cookie("jwt", "", {maximumAge: 0});
    res.status(200).json({message: "Logged out successfully"});
}