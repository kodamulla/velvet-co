import { useState } from "react";
import { createPortal } from "react-dom"; // Popup එක Screen එකේ මැදටම ගන්න මේක අලුතින් ගත්තා
import { toast } from "react-hot-toast";
import axios from "axios";

export default function ProductDeleteButton(props) {
    const productID = props.productId;
    const reload = props.reload;
    const [isMessageOpen, setIsMessageOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        setIsDeleting(true);
        const token = localStorage.getItem("token");

        axios.delete(import.meta.env.VITE_BACKEND_URL + "/products/" + productID, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(() => {
            toast.success("Product deleted successfully");
            setIsDeleting(false);
            setIsMessageOpen(false);
            reload();
            
            if (props.onDeleteSuccess) {
                props.onDeleteSuccess();
            }
        })
        .catch((error) => {
            console.error(error);
            toast.error("Error deleting product");
            setIsDeleting(false);
        });
    }

    return (
        <>
            {/* Table එකේ පෙන්නන Delete Button එක */}
            <button 
                onClick={() => setIsMessageOpen(true)} 
                className="w-[80px] bg-red-500/90 hover:bg-red-600 flex justify-center items-center text-white py-2 px-3 rounded-xl font-extrabold text-[10px] uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
                Delete
            </button>

            {/* Popup Box එක - createPortal පාවිච්චි කරලා කෙලින්ම Body එකට (Screen එකේ මැදට) යැව්වා */}
            {isMessageOpen && createPortal(
                <div className="fixed inset-0 z-[9999] flex justify-center items-center p-4"> 
                    
                    {/* Modal Box එක */}
                    <div className="w-full max-w-md bg-[#FAF4F0] rounded-[2.5rem] relative flex flex-col items-center justify-center p-10 border border-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden">
                        
                        {/* වසන (X) බොත්තම */}
                        <button 
                            onClick={() => setIsMessageOpen(false)} 
                            className="w-[36px] h-[36px] bg-text text-background rounded-full text-xl font-bold cursor-pointer hover:bg-[#1a100e] absolute right-6 top-6 shadow-md flex justify-center items-center transition-transform hover:rotate-90 duration-300"
                        >
                            ×
                        </button>

                        <h1 className="text-center text-2xl font-extrabold mt-2 mb-2 text-text tracking-tight">
                            Delete Product?
                        </h1>
                        <p className="text-center text-text/80 text-sm font-semibold mb-10">
                            Are you sure you want to delete this product? This action cannot be undone.
                        </p>

                        <div className="flex gap-4 w-full">
                            {/* Cancel බොත්තම */}
                            <button 
                                onClick={() => setIsMessageOpen(false)}
                                className="flex-1 py-4 border-2 border-text/60 bg-white/50 text-text/80 rounded-2xl flex items-center justify-center hover:bg-text hover:text-background hover:border-text hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-extrabold tracking-[0.2em] text-[10px] uppercase"
                            >
                                Cancel
                            </button>

                            {/* Delete බොත්තම */}
                            <button
                                disabled={isDeleting}
                                onClick={handleDelete}
                                className="flex-1 py-4 bg-red-500/90 text-white rounded-2xl flex items-center justify-center hover:bg-red-600 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-extrabold tracking-[0.2em] text-[10px] uppercase disabled:bg-red-300 disabled:transform-none disabled:shadow-none"
                            >
                                {isDeleting ? "Deleting..." : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>,
                document.body // මේකෙන් තමයි කියන්නේ Table එකෙන් එළියට අරන් කෙලින්ම Body එකට දාන්න කියලා
            )}
        </>
    );
}