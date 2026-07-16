import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import reviewRouter from './routes/reviewRouter.js';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URL;
mongoose.connect(mongoURI).then(() => console.log("Connected to Mongodb Cluster"))

const app = express()

app.use(cors());
app.use(express.json())
app.use(
    (req,res,next)=>{
        const authorizationHeader = req.header("Authorization")
        if(authorizationHeader != null){
            const token = authorizationHeader.replace("Bearer ", "")
            console.log(token)
            
            
            jwt.verify(token, process.env.JWT_SECRET,
                (error,content)=>{
                    console.log(content)

                    if(content == null){
                        console.log("invalid token")
                        res.json({
                            message: "invalid token"
                        })

                        next();

                
                    }else{
                        

                        req.user = content

                        next()
                    }

                }
            )
        }else{
            next()
        }
       
     

})






app.use("/api/users", userRouter)
app.use("/api/products", productRouter)
app.use("/api/reviews", reviewRouter);
app.listen(3000 , 
    () =>{
        console.log("server is running")
    }
)