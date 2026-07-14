// 1. Route සහ Link අලුතින් import කරගන්න
import { Routes, Route, Link } from "react-router-dom";

export default function AdminPage() {
    return (
        <div className="w-full h-screen flex overflow-hidden bg-secondary p-4">
            
            {/* Sidebar එක */}
            <div className="w-[300px] h-full flex-shrink-0 flex flex-col pt-4">
                
                {/* Logo එක සහ Admin අකුරු */}
                <div className="flex items-center gap-4 px-4">
                    <img 
                        src="/logo.png" 
                        alt="Velvet Co. Logo" 
                        className="w-20 h-20 object-contain hover:scale-105 transition-transform duration-300" 
                    />
                    <h1 className="text-2xl font-velvet font-bold text-text mt-1">Admin</h1>
                </div>
                
                {/* Sidebar Menu Links - <a> වෙනුවට <Link> දැම්මා */}
                {/* text-1xl කියලා එකක් නැහැ, ඒක text-xl වෙන්න ඕනේ */}
                <div className="w-full mt-10 px-6 text-text font-velvet flex flex-col gap-5 text-xl">
                    <Link to="/admin" className="hover:text-primary transition-colors">Orders</Link>
                    <Link to="/admin/products" className="hover:text-primary transition-colors">Products</Link>
                    <Link to="/admin/users" className="hover:text-primary transition-colors">Users</Link>
                    <Link to="/admin/reviews" className="hover:text-primary transition-colors">Reviews</Link>
                </div>
                
            </div>

            {/* Content පැත්ත */}
            <div className="flex-1 bg-background h-full overflow-y-auto rounded-3xl border-[10px] border-solid border-secondary/20 shadow-sm p-10">
                
                {/* <Routes> එකේ තිබ්බ path="/" අයින් කළා */}
                <Routes>
                    <Route path="/" element={<h1 className="text-3xl font-bold">Orders </h1>} />
                    <Route path="/products" element={<h1 className="text-3xl font-bold"> Products</h1>} />
                    <Route path="/users" element={<h1 className="text-3xl font-bold"> Users</h1>} />
                    <Route path="/reviews" element={<h1 className="text-3xl font-bold">Reviews</h1>} />
                </Routes>
                
            </div>
            
        </div>
    );
}