import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    async function register() {
        // Password match වෙනවද බලන්න
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/", {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                role: "customer" // default ලෙස customer ලෙස යවනවා
            });
            
            toast.success("Registration successful! Please login.");
            navigate("/login"); // සාර්ථක වුණාම Login පිටුවට යවනවා
        } catch (err) {
            console.error("Error registering:", err);
            toast.error("Registration failed. Please try again.");
        }
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-secondary lg:-space-x-40">
            
            {/* Register Form */}
            <div className="w-full lg:w-[50%] h-full flex justify-center items-center p-4 sm:p-8 z-10">
                
                <div className="w-full max-w-[480px] backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.08)] rounded-[2.5rem] bg-accent/10 border border-white/60 flex flex-col p-8 sm:p-12">
                    
                    <img 
                        src="/logo.png" 
                        alt="Velvet Co. Logo" 
                        className="w-20 h-20 sm:w-24 sm:h-24 object-contain mx-auto mb-6 drop-shadow-md" 
                    />
                    
                    <div className="flex flex-col">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-text mb-8 text-center tracking-tight">Create Account</h1>
                        
                        <input onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" className="w-full px-5 py-3.5 rounded-2xl mb-4 bg-white/60 border border-white/60 focus:bg-white focus:outline-none transition-all shadow-inner" />
                        <input onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" className="w-full px-5 py-3.5 rounded-2xl mb-4 bg-white/60 border border-white/60 focus:bg-white focus:outline-none transition-all shadow-inner" />
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" className="w-full px-5 py-3.5 rounded-2xl mb-4 bg-white/60 border border-white/60 focus:bg-white focus:outline-none transition-all shadow-inner" />
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full px-5 py-3.5 rounded-2xl mb-4 bg-white/60 border border-white/60 focus:bg-white focus:outline-none transition-all shadow-inner" />
                        <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" className="w-full px-5 py-3.5 rounded-2xl mb-8 bg-white/60 border border-white/60 focus:bg-white focus:outline-none transition-all shadow-inner" />
                        
                        <button onClick={register} className="w-full py-4 bg-text text-background rounded-2xl hover:bg-[#1a100e] transition-all duration-300 font-extrabold tracking-[0.2em] text-sm uppercase">
                            Register
                        </button>

                        <p className="text-center mt-8 text-sm text-text/70 font-medium">
                            Already have an account? <Link to="/login" className="font-bold text-text hover:text-primary transition-colors ml-1 underline decoration-2 underline-offset-4">Login here</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side Image */}
            <div className="hidden lg:flex w-[50%] h-screen p-10 xl:p-20 justify-center items-center">
                <img 
                    src="/login.png" 
                    alt="Register Visual" 
                    className="w-full h-full object-cover rounded-[3rem] shadow-2xl" 
                />
            </div>
        </div>
    );
}