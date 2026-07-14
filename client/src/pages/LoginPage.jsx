import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login(){
       console.log("Login button clicked");
       console.log("Email:", email);
       console.log("Password:", password);

       try{
              const res = await axios.post("http://localhost:3000/login", {
                email : email,
                password : password
              });
              console.log(res.data);
       } catch (error) {
              console.error("Error logging in:", error);
       }

       const res = await axios.post("http://localhost:3000/login", {
           email : email,
           password : password
       });

       console.log( res.data);


    }
    
    return (
        <div className="w-full h-screen flex items-center justify-center bg-secondary -space-x-40">
            
            {/* වම් පැත්ත (Login Form එක) */}
            <div className="w-[50%] h-full flex justify-center items-center">
                
                {/* Modern Glass Box එක (Blur එක වැඩි කරලා, Shadow එක Smooth කරලා තියෙනවා) */}
                <div className="w-[480px] backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.08)] rounded-[2.5rem] bg-accent/30 border border-white/60 flex flex-col p-12">
                    
                    {/* ලෝගෝ එක */}
                    <img 
                        src="/logo.png" 
                        alt="Velvet Co. Logo" 
                        className="w-24 h-24 object-contain mx-auto mb-6 drop-shadow-md" 
                    />
                    
                    {/* අකුරු සහ Inputs */}
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-extrabold text-text mb-8 text-center tracking-tight">Sign In</h1>
                        
                        {/* Modern Inputs (Shadow-inner සහ smooth rounded corners එකතු කර ඇත) */}
                        <input 
                            onChange={(e)=>{
                                console.log(e.target.value);
                                setEmail(e.target.value);
                            }}
                            type="email" 
                            placeholder="Email Address" 
                            className="w-full px-5 py-4 rounded-2xl mb-4 bg-white/60 border border-white/60 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-text placeholder-text/50 shadow-inner" 
                        />
                        <input 
                            onChange={(e)=>{
                                console.log(e.target.value);
                                setPassword(e.target.value);
                            }}
                            type="password" 
                            placeholder="Password" 
                            className="w-full px-5 py-4 rounded-2xl mb-2 bg-white/60 border border-white/60 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-text placeholder-text/50 shadow-inner" 
                        />

                        {/* Forget Password Link */}
                        <div className="flex justify-end mb-8">
                            <a href="/register" className="text-xs font-semibold text-text/70 hover:text-primary transition-colors hover:underline underline-offset-4">
                                Forgot Your Password?
                            </a>
                        </div>
                        
                        {/* Modern Button (Hover කරද්දී උඩට ඉස්සෙන Effect එකක් ඇත) */}
                        <button onClick={login} className="w-full py-4 bg-text text-background rounded-2xl hover:bg-[#1a100e] hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 font-extrabold tracking-[0.2em] text-sm uppercase">
                           Sign In
                        </button>

                        {/* Register Link එක */}
                        <p className="text-center mt-8 text-sm text-text/70 font-medium">
                            Don't have an account? <a href="/register" className="font-bold text-text hover:text-primary transition-colors ml-1 underline decoration-2 underline-offset-4">Register here</a>
                        </p>
                    </div>
                    
                </div>
                
            </div>

            {/* දකුණු පැත්ත (Image එක කුඩා කිරීම සඳහා p-20 ලබා දී ඇත) */}
            <div className="w-[50%] h-full p-20 flex justify-center items-center">
                <img 
                    src="/login.png" 
                    alt="Login Visual" 
                    /* කොන් තවත් රවුම් කර (rounded-[3rem]) ලස්සන කර ඇත */
                    className="w-full h-full object-cover rounded-[3rem] shadow-2xl" 
                />
            </div>

        </div>
    );
}