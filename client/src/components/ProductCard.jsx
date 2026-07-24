import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    return (
        <Link 
            to={"/overview/" + product.productID} 
            // 1. මෙතැනට 'flex flex-col' සහ 'h-full' එකතු කර ඇත
            className="group flex flex-col flex-shrink-0 w-[260px] lg:w-[230px] xl:w-[240px] snap-start bg-white rounded-[1.5rem] p-3.5 shadow-sm hover:shadow-[0_15px_35px_rgba(163,145,132,0.15)] transition-all duration-500 border border-secondary/60 hover:border-accent h-full"
        >
            {/* Image Container */}
            <div className="relative w-full h-48 overflow-hidden rounded-[1.2rem] bg-secondary/20 mb-4 shrink-0">
                <img 
                    src={product.images[0]} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={product.name} 
                />
            </div>

            {/* Content Section - 2. 'flex-grow' සහ 'flex flex-col' එකතු කර ඇත */}
            <div className="flex flex-col flex-grow px-1">
                <h1 className="text-base font-bold text-text truncate">{product.name}</h1>
                <p className="text-primary text-[11px] mt-0.5 mb-3 font-medium uppercase tracking-wider">{product.brand || "Velvet Co."}</p>
                
                {/* 3. mt-auto මගින් කාඩ් එකේ ඉඩ කොතරම් තිබුණත් මේ කොටස පහළටම තල්ලු කර සමාන මට්ටමක තබා ගනී */}
                <div className="mt-auto">
                    {/* Stats Row */}
                    <div className="flex items-center justify-between border-y border-secondary/50 py-2.5 my-2">
                        <div className="text-center">
                            <span className="block text-text font-bold text-xs">4.8</span>
                            <span className="text-[9px] text-primary uppercase tracking-widest font-semibold">Rating</span>
                        </div>
                        <div className="w-[1px] h-6 bg-secondary/50"></div>
                        <div className="text-center">
                            <span className="block text-text font-bold text-xs">Rs. {product.price?.toLocaleString()}</span>
                            <span className="text-[9px] text-primary uppercase tracking-widest font-semibold">Price</span>
                        </div>
                        <div className="w-[1px] h-6 bg-secondary/50"></div>
                        <div className="text-center">
                            <span className="block text-text font-bold text-xs">{product.stockQuantity > 0 ? "Stock" : "Out"}</span>
                            <span className="text-[9px] text-primary uppercase tracking-widest font-semibold">Ready</span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-3">
                        <button className="w-full py-2.5 bg-accent text-background rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary transition-all duration-300 shadow-md">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}