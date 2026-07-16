import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import ProductDeleteButton from "../../components/ProductDeleteButton";

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        if (!loaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/products")
            .then((response) => {
                console.log(response.data);
                setProducts(response.data);
                setLoaded(true);
            })
        }
    }, [loaded]);

    return (
        <div className="w-full h-full flex flex-col p-8 relative overflow-y-auto">
            
            <div className="w-full bg-accent/10 backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.05)] mb-20">
                <h1 className="text-3xl font-extrabold text-text mb-8 tracking-tight">All Products</h1>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-white/40 text-[11px] uppercase tracking-widest text-text/60">
                                <th className="p-4 font-extrabold">Image</th>
                                <th className="p-4 font-extrabold">Product ID</th>
                                <th className="p-4 font-extrabold">Name</th>
                                <th className="p-4 font-extrabold">Price</th>
                                <th className="p-4 font-extrabold">Labelled Price</th>
                                <th className="p-4 font-extrabold">Category</th>
                                <th className="p-4 font-extrabold">Brand</th>
                                <th className="p-4 font-extrabold">Model</th>
                                <th className="p-4 font-extrabold">Stock</th>
                                <th className="p-4 font-extrabold">Available</th>
                                <th className="p-4 font-extrabold text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((item, index) => (
                                    <tr key={index} className="border-b border-white/20 hover:bg-white/30 transition-colors duration-300">
                                        <td className="p-4">
                                            <img src={item.images?.[0]} className="w-16 h-16 object-cover rounded-2xl shadow-sm border border-white/50" alt="Product" />
                                        </td>
                                        <td className="p-4 font-bold text-text text-sm">{item.productID}</td>
                                        <td className="p-4 font-semibold text-text/80 text-sm">{item.name}</td>
                                        <td className="p-4 font-bold text-text text-sm">Rs. {item.price}</td>
                                        <td className="p-4 font-medium text-text/50 line-through text-sm">Rs. {item.labelledPrice}</td>
                                        <td className="p-4 font-medium text-text/80 text-sm">{item.category}</td>
                                        <td className="p-4 font-medium text-text/80 text-sm">{item.brand}</td>
                                        <td className="p-4 font-medium text-text/80 text-sm">{item.model}</td>
                                        <td className="p-4 font-bold text-text text-sm">{item.stock}</td>
                                        <td className="p-4">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                                                item.isAvailable 
                                                ? "bg-green-100 text-green-700 border border-green-200" 
                                                : "bg-red-100 text-red-700 border border-red-200"
                                            }`}>
                                                {item.isAvailable ? "Yes" : "No"}
                                            </span>
                                        </td>

                                        <td className="p-4 text-center">
                                            <div className="inline-flex items-center gap-2">
                                                {/* අලුත් Edit Button එක - Update පිටුවට යන්න හදලා තියෙන්නේ */}
                                                <Link
                                                    to={"/admin/update-product"} 
                                                    state={ item }
                                                    className="w-[80px] bg-blue-500/90 hover:bg-blue-600 flex justify-center items-center text-white py-2 px-3 rounded-xl font-extrabold text-[10px] uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                                >
                                                    Edit
                                                </Link>
                                                
                                                <ProductDeleteButton 
                                                    productId={item.productID} 
                                                    reload={() => setLoaded(false)} 
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <Link 
                to="/admin/add-product" 
                className="fixed right-12 bottom-12 w-16 h-16 flex justify-center items-center text-4xl bg-text text-background rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:scale-110 hover:-translate-y-2 hover:bg-[#1a100e] transition-all duration-300 z-50"
            >
                <BiPlus/>
            </Link>
        </div>
    );
}