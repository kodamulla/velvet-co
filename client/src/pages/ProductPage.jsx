import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/loader.jsx";
import ProductCard from "../components/productCard.jsx";
import { BiSearch } from "react-icons/bi";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/products");
                setProducts(res.data);
                setLoaded(true);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoaded(true); 
            }
        };
        fetchProducts();

        
    }, []); 

    return (
        <div className="w-full min-h-screen bg-[#FAF4F0] p-6 md:p-12">
            {!loaded ? (
                <Loader />
            ) : (
                <div className="max-w-7xl mx-auto mt-10">
                    {/* Modern Search Bar */}
                    <div className="relative mb-12 flex justify-center">
                        <input
                            type="text"
                            placeholder="Discover your favorites..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full max-w-lg pl-12 pr-6 py-4 bg-white border border-stone-200 rounded-3xl shadow-sm focus:ring-2 focus:ring-stone-400 focus:outline-none transition-all duration-300"
                        />
                        <BiSearch className="absolute left-5 top-5 text-stone-400 text-xl" />
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.length > 0 ? (
                            products.map((item) => (
                                <ProductCard key={item.productID} product={item} />
                            ))
                        ) : (
                            <p className="col-span-full text-center text-stone-500">No products found.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}