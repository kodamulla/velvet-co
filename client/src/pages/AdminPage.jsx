import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import Loader from "../components/loader.jsx"; // Loader එක නිවැරදි Path එකෙන් Import කරන්න
import AdminProductsPage from "./admin/AdminProductsPage";
import AdminAddProductPage from "./admin/AdminAddProductPage";
import AdminUpdateProductPage from "./admin/AdminUpdateProductPage";
import AdminOrdersPage from "./admin/AdminOrdersPage";
import { FaClipboardList, FaBox, FaUsers, FaStar, FaBars } from "react-icons/fa";

export default function AdminPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        // 1. Token එකක් නැත්නම් කෙලින්ම home එකට යවනවා
        if (!token) {
            window.location.href = "/";
            return;
        }

        // 2. Token එකක් තියෙනවා නම් ඒක valid ද සහ user admin ද කියලා Backend එකෙන් බලනවා
        axios.get(import.meta.env.VITE_BACKEND_URL + "/users/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            
            if (response.data.role === "admin") {
                setUser(response.data);
            } else {
                
                window.location.href = "/";
            }
        })
        .catch((error) => {
            
            localStorage.removeItem("token");
            window.location.href = "/";
        });
    }, []);

    return (
        <div className="w-full h-screen flex overflow-hidden bg-secondary p-4 relative">
            {user ? (
                <>
                    {/* Mobile Sidebar Toggle Button */}
                    <button 
                        className="md:hidden absolute top-6 left-6 z-50 text-text text-2xl" 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <FaBars />
                    </button>
                    
                    {/* Sidebar */}
                    <div className={`fixed md:relative z-40 w-[300px] h-full flex-shrink-0 flex flex-col pt-4 bg-secondary transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                        
                        {/* Logo */}
                        <div className="flex items-center gap-4 px-4">
                            <img 
                                src="/logo.png" 
                                alt="Velvet Co. Logo" 
                                className="w-20 h-20 object-contain hover:scale-105 transition-transform duration-300" 
                            />
                            <h1 className="text-2xl font-velvet font-bold text-text mt-1">Admin</h1>
                        </div>
                        
                        {/* Sidebar Menu Links */}
                        <div className="w-full mt-10 px-6 text-text font-velvet flex flex-col gap-5 text-xl" onClick={() => setIsSidebarOpen(false)}>
                            <Link to="/admin/orders" className="hover:text-primary transition-colors flex items-center gap-3">
                                <FaClipboardList /> Orders
                            </Link>
                            <Link to="/admin/products" className="hover:text-primary transition-colors flex items-center gap-3">
                                <FaBox /> Products
                            </Link>
                            <Link to="/admin/users" className="hover:text-primary transition-colors flex items-center gap-3">
                                <FaUsers /> Users
                            </Link>
                            <Link to="/admin/reviews" className="hover:text-primary transition-colors flex items-center gap-3">
                                <FaStar /> Reviews
                            </Link>
                        </div>
                        
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-background h-full overflow-y-auto rounded-3xl border-[10px] border-solid border-secondary/20 shadow-sm p-4 md:p-10 ml-0 md:ml-4 transition-all">
                        
                        <Routes>
                            <Route path="/" element={<h1 className="text-3xl font-bold">Orders </h1>} />
                            <Route path="/products" element={<AdminProductsPage />} />
                            <Route path="/orders" element={<AdminOrdersPage />} />
                            <Route path="/add-product" element={<AdminAddProductPage />} />
                            <Route path="/update-product" element={<AdminUpdateProductPage />} />
                            <Route path="/users" element={<h1 className="text-3xl font-bold">Users</h1>} />
                            <Route path="/reviews" element={<h1 className="text-3xl font-bold">Reviews</h1>} />
                        </Routes>
                        
                    </div>
                </>
            ) : (
                <div className="flex-1 flex justify-center items-center">
                    <Loader />
                </div>
            )}
        </div>
    );
}