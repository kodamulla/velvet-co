import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/loader.jsx";
import ProductCard from "../components/productCard.jsx";
import { BiSearch } from "react-icons/bi";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [query, setQuery] = useState("");

    // Categories ලැයිස්තුව
    const categories = ["Skincare", "Makeup", "Haircare", "Fragrances", "Bath & Body"];

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
                <div className="max-w-7xl mx-auto mt-20">
                    
                    {/* Modern Compact Search Bar */}
                    <div className="mb-12 flex justify-center">
                        <div className="relative w-full max-w-sm">
                            <BiSearch className="absolute left-3 top-3.5 text-stone-400 text-lg" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-full shadow-sm focus:ring-2 focus:ring-stone-400 focus:outline-none transition-all duration-300 text-sm"
                            />
                        </div>
                    </div>

                    {/* Categories Loop */}
                    {categories.map((category) => {
                        const filteredProducts = products.filter(
                            (p) => p.category === category && p.name.toLowerCase().includes(query.toLowerCase())
                        );

                        if (filteredProducts.length === 0) return null;

                        return (
                            <div key={category} className="mb-16">
                                <h2 className="text-2xl font-bold text-stone-900 mb-8 px-4 border-l-4 border-stone-900 ml-2">
                                    {category}
                                </h2>
                                
                                <div className="w-full flex overflow-x-auto snap-x snap-mandatory gap-5 pb-8 pt-4 px-4 scrollbar-hide">
                                    {filteredProducts.map((item) => (
                                        <ProductCard key={item.productID} product={item} />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}