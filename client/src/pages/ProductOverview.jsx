import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../components/loader";
import ImageSlider from "../components/ImageSlider";
import { CgChevronRight } from "react-icons/cg";
import { addToCart } from "../utils/cart.js";


export default function ProductOverview() {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setStatus("loading");
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/products/" + params.productID)
      .then((response) => {
        setProduct(response.data);
        setStatus("success");
      })
      .catch(() => {
        toast.error("Product Not Found");
        setStatus("error");
      });
  }, [params.productID]);

  return (
    <div className="min-h-screen bg-[#FAF4F0] px-6 md:p-12 pt-40 pb-12">
      {status === "loading" && <Loader />}

      {status === "error" && (
        <h1 className="text-center mt-20 text-2xl text-stone-600">Error loading product</h1>
      )}

      {status === "success" && product && (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <div className="sticky top-24">
              <ImageSlider images={product.images} />
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 text-stone-500 font-medium">
              <span className="bg-stone-200 px-3 py-1 rounded-full text-xs uppercase tracking-widest">{product.productID}</span>
              <span className="flex items-center gap-1 text-sm"><CgChevronRight/> {product.category}</span>
            </div>

            {product.altNames && product.altNames.length > 0 && (
              <h3 className="text-stone-600 italic">Variations: {product.altNames.join(" | ")}</h3>
            )}

            <p className="text-stone-700 leading-relaxed text-lg bg-white/50 p-6 rounded-3xl border border-stone-100">
              {product.description}
            </p>

            <div className="flex items-baseline gap-4">
              <h2 className="text-4xl font-bold text-stone-900">
                Rs. {product.price?.toLocaleString()}
              </h2>
              {product.labelPrice > product.price && (
                <h2 className="text-xl text-stone-400 line-through">
                  Rs. {product.labelPrice?.toLocaleString()}
                </h2>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={() => addToCart(product, 1)}
                className="flex-1 bg-stone-900 text-white py-4 rounded-2xl font-bold hover:bg-stone-700 transition-all duration-300 shadow-lg shadow-stone-200"
              >
                Add to Cart
              </button>
              <button
                onClick={() => navigate("/checkout", { state: [{
                  productID: product.productID,
                  name: product.name,
                  price: product.price,
                  labelPrice: product.labelPrice,
                  image: product.images[0],
                  quantity: 1
                }] })}
                className="flex-1 bg-stone-200 text-stone-900 py-4 rounded-2xl font-bold hover:bg-stone-300 transition-all duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}