import { useState } from "react";
import { getCart } from "../utils/cart";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { addToCart } from "../utils/cart.js";
import { getCartTotal } from "../utils/cart.js";
import { Link } from "react-router-dom";


export default function CartPage() {
    const [cart, setCart] = useState(getCart());
    console.log("Cart contents:", cart);

    return (
        // pt-36 මගින් Header එකට ඉඩ ලබා දී ඇත. පසුබිම #FAF4F0
        <div className="min-h-screen w-full bg-[#FAF4F0] px-6 md:px-12 pt-36 pb-12 flex flex-col items-center">
            
            {/* Page Title */}
            <div className="w-full max-w-4xl mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-stone-900">Shopping Cart</h1>
                <p className="text-stone-500 mt-2">Review your items before checkout</p>
            </div>

            {/* Cart Items List */}
            <div className="w-full max-w-4xl flex flex-col gap-4">
                {cart.map((item, index) => {
                    return (
                        <div key={index} className="w-full bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-stone-100 flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 transition-all hover:shadow-md">
                            
                            {/* Product Image */}
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover bg-[#FAF4F0]" 
                            />
                            
                            {/* Product Details */}
                            <div className="flex-1 flex flex-col">
                                <h1 className="text-xl font-bold text-stone-900 leading-tight">{item.name}</h1>
                                <h3 className="text-xs text-stone-400 uppercase tracking-widest mt-1 mb-3">{item.productID}</h3>
                                
                                <div className="flex items-center gap-3">
                                    <h2 className="text-lg font-semibold text-stone-900">
                                        Rs. {item.price.toLocaleString()}
                                    </h2>
                                    {item.labelPrice > item.price && (
                                        <h2 className="text-sm text-stone-400 line-through">
                                            Rs. {item.labelPrice.toLocaleString()}
                                        </h2>
                                    )}
                                </div>
                            </div>

                            {/* Quantity Controls & Subtotal */}
                            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-6 sm:gap-8 mt-2 sm:mt-0">
                                
                                {/* Quantity Increment / Decrement */}
                                <div className="flex items-center gap-4 bg-[#FAF4F0] px-4 py-2 rounded-2xl">
                                    <BsChevronDown 
                                        onClick={() => {
                                            addToCart(item, -1);
                                            setCart(getCart());
                                        }} 
                                        className="text-lg cursor-pointer text-stone-500 hover:text-stone-900 transition-colors" 
                                    />
                                    <span className="font-bold text-stone-900 w-4 text-center">{item.quantity}</span>
                                    <BsChevronUp 
                                        onClick={() => {
                                            addToCart(item, 1);
                                            setCart(getCart());
                                        }} 
                                        className="text-lg cursor-pointer text-stone-500 hover:text-stone-900 transition-colors" 
                                    />
                                </div>

                                {/* Item Subtotal */}
                                <div className="text-right">
                                    <p className="text-xs text-stone-400 sm:hidden mb-1">Subtotal</p>
                                    <span className="text-xl font-bold text-stone-900 sm:w-[120px] block">
                                        Rs. {(item.price * item.quantity).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Checkout & Total Section */}
            {cart.length > 0 && (
                <div className="w-full max-w-4xl bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-stone-100 mt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col text-center sm:text-left">
                        <span className="text-stone-500 text-sm uppercase tracking-widest font-semibold mb-1">Total Amount</span>
                        <span className="text-3xl md:text-4xl font-bold text-stone-900">
                            Rs. {getCartTotal().toLocaleString()}
                        </span>
                    </div>
                    
                    <Link 
                        to="/checkout" 
                        state={cart}
                        className="w-full sm:w-auto px-10 py-4 bg-stone-900 text-white rounded-2xl font-bold text-center hover:bg-stone-700 transition-all duration-300 shadow-lg shadow-stone-200"
                    >
                        Proceed to Checkout
                    </Link>
                </div>
            )}
            
            {/* Empty Cart Message (පොඩි අමතර දියුණුවක්) */}
            {cart.length === 0 && (
                <div className="w-full max-w-4xl text-center py-20">
                    <h2 className="text-2xl font-bold text-stone-400">Your cart is empty</h2>
                    <Link to="/products" className="text-stone-900 font-semibold underline mt-4 inline-block">Continue Shopping</Link>
                </div>
            )}

        </div>
    );
}