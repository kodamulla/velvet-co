
import { Routes, Route, Link } from "react-router-dom";
import AdminProductsPage from "./admin/AdminProductsPage";
import AdminAddProductPage from "./admin/AdminAddProductPage";
import AdminUpdateProductPage from "./admin/AdminUpdateProductPage";
import AdminOrdersPage from "./admin/AdminOrdersPage";
import { FaClipboardList, FaBox, FaUsers, FaStar } from "react-icons/fa";

export default function AdminPage() {
    return (
        <div className="w-full h-screen flex overflow-hidden bg-secondary p-4">
            
            {/* Sidebar  */}
            <div className="w-[300px] h-full flex-shrink-0 flex flex-col pt-4">
                
                {/* Logo  */}
                <div className="flex items-center gap-4 px-4">
                    <img 
                        src="/logo.png" 
                        alt="Velvet Co. Logo" 
                        className="w-20 h-20 object-contain hover:scale-105 transition-transform duration-300" 
                    />
                    <h1 className="text-2xl font-velvet font-bold text-text mt-1">Admin</h1>
                </div>
                
                {/* Sidebar Menu Links */}
                <div className="w-full mt-10 px-6 text-text font-velvet flex flex-col gap-5 text-xl">
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

            {/* Content  */}
            <div className="flex-1 bg-background h-full overflow-y-auto rounded-3xl border-[10px] border-solid border-secondary/20 shadow-sm p-10">
                
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
            
        </div>
    );
}