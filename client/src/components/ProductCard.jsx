import { Link } from "react-router-dom";
import { addToCart } from "../utils/cart.js";

export default function ProductCard({ product }) {
    return (
        <Link 
            to={"/overview/" + product.productID} 
            className="group flex flex-col bg-white rounded-3xl p-4 shadow-sm border border-stone-100 hover:shadow-2xl transition-all duration-500"
        >
            {/* Image Container */}
            <div className="relative w-full h-72 overflow-hidden rounded-2xl bg-stone-100">
                <img 
                    src={product.images[0]} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={product.name} 
                />
            </div>

            {/* Details */}
            <div className="mt-5 px-2 flex flex-col flex-grow">
                <h1 className="text-stone-800 font-semibold text-lg truncate">{product.name}</h1>
                <p className="text-stone-400 text-sm mb-3">{product.brand}</p>
                
                <div className="mt-auto flex items-center justify-between">
                    <h2 className="text-xl font-bold text-stone-900">
                        Rs. {product.price?.toLocaleString()}
                    </h2>
                    {product.labelPrice > product.price && (
                        <span className="text-xs text-stone-400 line-through">
                            Rs. {product.labelPrice?.toLocaleString()}
                        </span>
                    )}
                </div>
            </div>

            {/* View Button */}
            <div className="mt-4">
                <button className="w-full py-3 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-700 transition-colors duration-300">
                    View Details
                </button>
            </div>
        </Link>
    );
}