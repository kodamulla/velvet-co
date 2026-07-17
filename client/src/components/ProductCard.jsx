import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    return (
        <Link 
            to={"/overview/" + product.productID} 
            className="group block bg-white rounded-[32px] p-5 shadow-[0_8px_30px_rgba(141,123,104,0.08)] hover:shadow-[0_20px_40px_rgba(141,123,104,0.15)] transition-all duration-500 border border-secondary"
        >
            {/* Image Container */}
            <div className="relative w-full h-72 overflow-hidden rounded-[24px] bg-secondary/30 mb-5">
                <img 
                    src={product.images[0]} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={product.name} 
                />
            </div>

            {/* Content Section */}
            <div className="px-1">
                <h1 className="text-xl font-bold text-text truncate">{product.name}</h1>
                <p className="text-primary text-sm mt-1 mb-4 font-medium">{product.brand || "Velvet Co."}</p>
                
                {/* Stats Row */}
                <div className="flex items-center justify-between border-y border-secondary py-3 my-2">
                    <div className="text-center">
                        <span className="block text-text font-bold text-sm">4.8</span>
                        <span className="text-[10px] text-primary uppercase tracking-wider font-semibold">Rating</span>
                    </div>
                    <div className="w-[1px] h-8 bg-secondary"></div>
                    <div className="text-center">
                        <span className="block text-text font-bold text-sm">Rs. {product.price?.toLocaleString()}</span>
                        <span className="text-[10px] text-primary uppercase tracking-wider font-semibold">Price</span>
                    </div>
                    <div className="w-[1px] h-8 bg-secondary"></div>
                    <div className="text-center">
                        <span className="block text-text font-bold text-sm">Stock</span>
                        <span className="text-[10px] text-primary uppercase tracking-wider font-semibold">Ready</span>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <div className="mt-4">
                <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:bg-accent transition-all duration-300 shadow-lg shadow-primary/20">
                    View Details
                </button>
            </div>
        </Link>
    );
}