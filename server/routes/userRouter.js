import express from 'express';
import { createUser, getUser, loginUser,sendOTP, getAllUsers,updateUsersStatus } from '../controllers/userController.js';
import { googleLogin } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.get("/all", getAllUsers);
userRouter.post("/login", loginUser);
userRouter.get("/", getUser);
userRouter.post("/google", googleLogin);
userRouter.get("/send-otp/:email", sendOTP);
userRouter.put("/status/:email", updateUsersStatus);


export default userRouter;