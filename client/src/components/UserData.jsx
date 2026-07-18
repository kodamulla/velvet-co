import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function UserData() {
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token != null) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/users/", {
                headers: { Authorization: `Bearer ${token}` }
            }).then((response) => {
                setUser(response.data);
            }).catch(() => {
                setUser(null);
            });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <div className="relative">
            {user ? (
                <div 
                    className="flex items-center gap-3 bg-secondary/50 px-3 py-1.5 rounded-full border border-secondary cursor-pointer hover:bg-secondary/70 transition-colors" 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {/* User Image හෝ Icon එක */}
                    <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center border border-primary/20 bg-secondary">
                        {user.image && user.image !== "" && user.image !== "/default.jpg" ? (
                            <img 
                                src={user.image} 
                                referrerPolicy="no-referrer" 
                                className="w-full h-full object-cover" 
                                alt="User"
                                // පින්තූරේ වැරදි නම් මේක පාවිච්චි කරලා Icon එකට මාරු වෙන්න හදනවා
                                onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg" class="text-primary"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.1 7.1.3 16.7 1.5 33.1 2.3 40.9 2.3s24.2-.8 40.9-2.3c2.3-.2 4.7-.3 7.1-.3 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path></svg>'; }}
                            />
                        ) : (
                            <FaUserCircle size={24} className="text-primary" />
                        )}
                    </div>
                    
                    <span className="font-semibold text-text text-sm font-velvet">{user.firstName}</span>
                    
                    {/* Dropdown Menu */}
                    {isOpen && (
                        <div className="absolute top-12 right-0 bg-background border border-secondary shadow-2xl rounded-2xl p-2 w-40 flex flex-col z-[100]">
                            <button 
                                onClick={() => window.location.href = "/orders"} 
                                className="px-4 py-2 text-sm text-text font-semibold hover:bg-secondary rounded-xl text-left transition-colors"
                            >
                                My Orders
                            </button>
                            <button 
                                onClick={handleLogout} 
                                className="px-4 py-2 text-sm text-red-500 font-semibold hover:bg-secondary rounded-xl text-left transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <Link to="/login" className="px-5 py-2.5 bg-primary hover:bg-accent transition-colors rounded-full text-white text-sm font-bold shadow-sm">
                        Login
                    </Link>
                    <Link to="/register" className="px-5 py-2.5 bg-background border border-primary text-primary hover:bg-secondary transition-colors rounded-full text-sm font-bold">
                        Register
                    </Link>
                </div>
            )}
        </div>
    );
}