import { toast } from "react-hot-toast";

// 1. Get Cart
export function getCart() {
    const cartString = localStorage.getItem("cart");
    
    if (!cartString) {
        localStorage.setItem("cart", "[]");
        return [];
    }
    
    try {
        return JSON.parse(cartString);
    } catch (error) {
        
        return [];
    }
}

// 2. Add / Update Cart
export function addToCart(product, quantity) {
    const cart = getCart();
    const index = cart.findIndex((item) => item.productID === product.productID);

    if (index === -1) {
        
        cart.push({
            productID: product.productID,
            name: product.name,
            price: product.price,
            labelPrice: product.labelPrice,
            quantity: quantity,
           
            image: product.images && product.images.length > 0 ? product.images[0] : ""
        });
        toast.success(`${product.name} added to cart`);
    } else {
       
        const newQty = cart[index].quantity + quantity;
        
        if (newQty <= 0) {
            cart.splice(index, 1);
            toast.success(`${product.name} removed from cart`);
        } else {
            cart[index].quantity = newQty;
            toast.success(`Updated ${product.name} quantity to ${newQty}`);
        }
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
}

// 3. Empty Cart
export function emptyCart() {
    localStorage.setItem("cart", "[]");
}

// 4. Get Cart Total
export function getCartTotal() {
    const cart = getCart();
    
    
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}