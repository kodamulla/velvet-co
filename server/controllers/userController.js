import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios"; // Google Login එකට අවශ්‍ය නිසා අලුතින් එකතු කළා

dotenv.config();

export function createUser(req, res) {
    const data = req.body;
    const hashedPassword = bcrypt.hashSync(data.password, 10);

    const user = new User({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: hashedPassword,
        role: data.role,
    });
    user.save()
        .then(() => {
            res.json({ message: "User created successfully" });
        })
        
}

export function loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.find({ email: email })
        .then((users) => {
            if (users[0] == null) {
                res.json({ message: "User not found" });
            } else {
                const user = users[0];

                const isPasswordCorrect = bcrypt.compareSync(password, user.password);
                
                const playload = {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    isemailVerified: user.isemailVerified,
                    image: user.image,
                };

                const token = jwt.sign(playload, process.env.JWT_SECRET,{
                    expiresIn: "150h"
                })
                
                if (isPasswordCorrect) {
                    res.json({ message: "Login successful",
                        token: token,
                        role: user.role,
                     });
                } else {
                    res.status(401).json({ message: "Invalid password" });
                }
            }
        }
        )
}

// අලුතින් එකතු කළ getUser function එක
export function getUser(req, res) {
    const token = req.headers.authorization;

    if (token == null) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const tokenData = token.replace("Bearer ", "");

    jwt.verify(tokenData, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(403).json({ message: "Forbidden" });
        } else {
            res.json(decoded);
        }
    });
}

export function isAdmin(req){
    if(req.user == null){
        
        return false
    }
    if(req.user.role != "admin"){
        
        return false
    }
    return true
}

// ඔයා ලබා දුන් Google Login function එක (කිසිදු වෙනසක් කර නැත)
export async function googleLogin(req, res) {
    console.log(req.body.token)
    try{
        const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                Authorization: `Bearer ${req.body.token}`
            }
            });
            console.log(response.data)

            const user = await User.findOne({ email: response.data.email });
            if(user == null){
                const newUser = new User({
                    email: response.data.email,
                    firstName: response.data.given_name,
                    lastName: response.data.family_name,
                    password:"123",
                    image: response.data.picture,
                });
                await newUser.save();

                const payload = {
                    email: newUser.email,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    role: newUser.role,
                    isEmailverified: true,
                    image: newUser.image
                };
                const token = jwt.sign(payload, process.env.JWT_SECRET);

                
                res.json({
                    message: "Login successful",
                    token: token,
                    role: newUser.role 
                });
                
            }else{
                if(user.isBlocked){
                    return res.status(403).json({
                        message: "User is blocked"
                    });
                }
                const payload = {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    isEmailverified: user.isEmailverified,
                    image: user.image
                };

                const token = jwt.sign(payload, process.env.JWT_SECRET);

                
                res.json({
                    message: "Login successful",
                    token: token,
                    role: user.role 
                });
            }

    }catch(error){
        res.status(500).json({ 
            message: "Google login failed" ,
            error: error.message});
    }
}