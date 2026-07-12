import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import reviewRouter from './routes/reviewRouter.js';
import jwt from 'jsonwebtoken';


let mongoURI = "mongodb+srv://admin:1234@cluster0.hlrrzfe.mongodb.net/velvet_co?appName=Cluster0"
mongoose.connect(mongoURI).then(() => console.log("Connected to Mongodb Cluster"))

let app = express()

app.use(express.json())
app.use(
    (req,res,next)=>{
        const authorizationHeader = req.header("Authorization")
        if(authorizationHeader != null){
            const token = authorizationHeader.replace("Bearer ", "")
            console.log(token)
            
            
            jwt.verify(token, "secretkeyvelvet_co",
                (error,content)=>{
                    console.log(content)

                    if(content == null){
                        console.log("invalid token")
                        res.json({
                            message: "invalid token"
                        })

                
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






app.use("/users", userRouter)
app.use("/products", productRouter)
app.use("/reviews", reviewRouter);
app.listen(3000 , 
    () =>{
        console.log("server is running")
    }
)