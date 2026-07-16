import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const [cart, setCart] = useState(location.state || []);

    // React වල නිවැරදිම ක්‍රමය: Page එක Load වෙද්දී Cart එක හිස් නම් ආපහු Products වලට යවනවා
    useEffect(() => {
        if (!location.state || location.state.length === 0) {
            navigate("/products");
        }
    }, [location, navigate]);

    function getCartTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.quantity;
        });
        return total;
    }

    function submitOrder() {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("You must be logged in to place an order");
            navigate("/login");
            return;
        }

        if (!name || !phone || !address) {
            toast.error("Please fill in all the delivery details.");
            return;
        }

        const orderItems = cart.map(item => ({
            productID: item.productID,
            quantity: item.quantity,
        }));

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
            name: name,
            address: address,
            phone: phone,
            items: orderItems,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => {
            toast.success("Order placed successfully!");
            // Order එක සාර්ථක වුණාට පස්සේ Cart එක හිස් කරලා Home එකට හෝ Orders වලට යවන්න පුළුවන්
            localStorage.setItem("cart", "[]"); 
            navigate("/");
        }).catch((err) => {
            console.log(err);
            toast.error("Failed to place order. Please check your connection.");
        });
    }

    return (
        <div className="min-h-screen w-full bg-[#FAF4F0] px-6 md:px-12 pt-36 pb-12 flex flex-col items-center">
            
            {/* Page Header */}
            <div className="w-full max-w-4xl mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-stone-900">Checkout</h1>
                <p className="text-stone-500 mt-2">Complete your delivery details to place the order.</p>
            </div>

            {/* Cart Items Summary */}
            <div className="w-full max-w-4xl flex flex-col gap-4 mb-8">
                {cart.map((item, index) => (
                    <div key={item.productID || index} className="w-full bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-stone-100 flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
                        
                        <img src={item.image} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover bg-[#FAF4F0]" />
                        
                        <div className="flex-1 flex flex-col">
                            <h1 className="text-xl font-bold text-stone-900 leading-tight">{item.name}</h1>
                            <div className="flex items-center gap-3 mt-2">
                                <h2 className="text-lg font-semibold text-stone-900">Rs. {item.price.toLocaleString()}</h2>
                                {item.labelPrice > item.price && (
                                    <h2 className="text-sm text-stone-400 line-through">Rs. {item.labelPrice.toLocaleString()}</h2>
                                )}
                            </div>
                        </div>

                        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-6 sm:gap-8 mt-2 sm:mt-0">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-4 bg-[#FAF4F0] px-4 py-2 rounded-2xl">
                                <BsChevronDown 
                                    onClick={() => {
                                        const copiedCart = [...cart];
                                        if (copiedCart[index].quantity > 1) {
                                            copiedCart[index].quantity -= 1;
                                        } else {
                                            copiedCart.splice(index, 1);
                                        }
                                        setCart(copiedCart);
                                    }} 
                                    className="text-lg cursor-pointer text-stone-500 hover:text-stone-900 transition-colors" 
                                />
                                <span className="font-bold text-stone-900 w-4 text-center">{item.quantity}</span>
                                <BsChevronUp 
                                    onClick={() => {
                                        const copiedCart = [...cart];
                                        copiedCart[index].quantity += 1;
                                        setCart(copiedCart);
                                    }} 
                                    className="text-lg cursor-pointer text-stone-500 hover:text-stone-900 transition-colors" 
                                />
                            </div>

                            {/* Subtotal */}
                            <div className="text-right">
                                <span className="text-lg font-bold text-stone-900 sm:w-[120px] block">
                                    Rs. {(item.price * item.quantity).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Shipping Details Form */}
            <div className="w-full max-w-4xl bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-stone-100 flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-stone-900 mb-2">Delivery Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-stone-600">Full Name</label>
                        <input 
                            type="text" 
                            placeholder="Enter your name"
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="w-full p-4 bg-[#FAF4F0] border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all" 
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-stone-600">Phone Number</label>
                        <input 
                            type="text" 
                            placeholder="Enter your phone number"
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
                            className="w-full p-4 bg-[#FAF4F0] border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all" 
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-stone-600">Delivery Address</label>
                    <textarea 
                        rows="3"
                        placeholder="Enter your full address"
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        className="w-full p-4 bg-[#FAF4F0] border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all resize-none" 
                    />
                </div>
            </div>

            {/* Order Summary Footer */}
            <div className="w-full max-w-4xl bg-stone-900 text-white p-6 md:p-8 rounded-3xl shadow-xl mt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex flex-col text-center sm:text-left">
                    <span className="text-stone-400 text-sm uppercase tracking-widest font-semibold mb-1">Total Amount</span>
                    <span className="text-3xl md:text-4xl font-bold text-white">
                        Rs. {getCartTotal().toLocaleString()}
                    </span>
                </div>
                
                <button 
                    onClick={submitOrder} 
                    className="w-full sm:w-auto px-12 py-4 bg-white text-stone-900 rounded-2xl font-bold hover:bg-stone-200 transition-all duration-300"
                >
                    Confirm Order
                </button>
            </div>

        </div>
    );
}