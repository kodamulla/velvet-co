import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { GrGoogle } from "react-icons/gr";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const googlelogin = useGoogleLogin({
        onSuccess: (response) => { 
            setLoading(true);
            axios.post(import.meta.env.VITE_BACKEND_URL + "/users/google", {
                token: response.access_token
            })
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                if(res.data.role === "admin"){
                    navigate("/admin");
                }else{
                    navigate("/");
                }
                toast.success("Login successful!");
                setIsLoading(false);
            })
            .catch((err) => {
                
            });
            setIsLoading(false);
         },
        onError: (error) => { toast.error("Google login failed. Please try again.");  },
        onNonOAuthError: (error) => { toast.error("Google login failed. Please try again.");  },
       

            
            
        
    })

    async function login(){
       console.log("Login button clicked");
       console.log("Email:", email);
       console.log("Password:", password);

       
       if (!email || !password) {
           toast.error("Please enter both email and password.");
           return; 
       }

       try {
              const res = await axios.post(import.meta.env.VITE_BACKEND_URL +"/users/login", {
                email : email,
                password : password
              });
              console.log(res);

              localStorage.setItem("token", res.data.token);
              

              if(res.data.role === "admin"){
                navigate("/admin");
                
              }else{
                navigate("/");
              }
              
              toast.success("Login successful! Welcome Back.");
            
       } catch (err) {
              console.error("Error logging in:", err);
              toast.error("Login failed. Please check your credentials and try again.");
              console.log(err);
       }
    }
    
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-secondary lg:-space-x-40">
            
            {/* Login Form  */}
            <div className="w-full lg:w-[50%] h-full flex justify-center items-center p-4 sm:p-8 z-10">
                
                {/* Modern Glass Box  */}
                <div className="w-full max-w-[480px] backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.08)] rounded-[2.5rem] bg-accent/10 border border-white/60 flex flex-col p-8 sm:p-12">
                    
                    {/* logo */}
                    <img 
                        src="/logo.png" 
                        alt="Velvet Co. Logo" 
                        className="w-20 h-20 sm:w-24 sm:h-24 object-contain mx-auto mb-6 drop-shadow-md" 
                    />
                    
                    {/*  Inputs */}
                    <div className="flex flex-col">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-text mb-8 text-center tracking-tight">Sign In</h1>
                        
                        {/* Modern Inputs */}
                        <input 
                            onChange={(e)=>{
                                console.log(e.target.value);
                                setEmail(e.target.value);
                            }}
                            type="email" 
                            placeholder="Email Address" 
                            className="w-full px-5 py-3.5 sm:py-4 rounded-2xl mb-4 bg-white/60 border border-white/60 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-text placeholder-text/50 shadow-inner" 
                        />
                        <input 
                            onChange={(e)=>{
                                console.log(e.target.value);
                                setPassword(e.target.value);
                            }}
                            type="password" 
                            placeholder="Password" 
                            className="w-full px-5 py-3.5 sm:py-4 rounded-2xl mb-2 bg-white/60 border border-white/60 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-text placeholder-text/50 shadow-inner" 
                        />

                        {/* Forget Password Link */}
                        <div className="flex justify-end mb-8">
                            <a href="/register" className="text-xs font-semibold text-text/70 hover:text-primary transition-colors hover:underline underline-offset-4">
                                Forgot Your Password?
                            </a>
                        </div>
                        
                        {/* Modern Button */}
                        <button onClick={login} className="w-full mb-[20px] py-3.5 sm:py-4 bg-text text-background rounded-2xl hover:bg-[#1a100e] hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 font-extrabold tracking-[0.2em] text-sm uppercase">
                           Sign In
                        </button>

                        <button onClick={googlelogin} className="w-full py-3.5 sm:py-4 bg-text text-background rounded-2xl hover:bg-[#1a100e] hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 font-extrabold tracking-[0.2em] text-sm uppercase">
                           Sign In with <GrGoogle className="inline-block ml-2" />
                        </button>

                        {/* Register Link */}
                        <p className="text-center mt-8 text-sm text-text/70 font-medium">
                            Don't have an account? <a href="/register" className="font-bold text-text hover:text-primary transition-colors ml-1 underline decoration-2 underline-offset-4">Register here</a>
                        </p>
                    </div>
                    
                </div>
                
            </div>

            {/* (Image)  */}
            <div className="hidden lg:flex w-[50%] h-screen p-10 xl:p-20 justify-center items-center">
                <img 
                    src="/login.png" 
                    alt="Login Visual" 
                    className="w-full h-full object-cover rounded-[3rem] shadow-2xl" 
                />
            </div>

        </div>
    );
}