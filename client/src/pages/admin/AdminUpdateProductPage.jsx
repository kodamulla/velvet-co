import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import toast from "react-hot-toast"; 
import { uploadFile } from "../../utils/mediaupload";
import { useLocation } from "react-router-dom";

export default function AdminUpdateProductsPage() {
    const location = useLocation();
    const [productID, setProductID] = useState(location.state.productID);
    const [name, setName] = useState(location.state.name);
    const [altNames, setAltNames] = useState(location.state.altNames?.join(", ") );
    const [description, setDescription] = useState(location.state.description);
    const [price, setPrice] = useState(location.state.price);
    const [labelledPrice, setLabelledPrice] = useState(location.state.labelledPrice);
    const [files, setFiles] = useState([]);
    const [category, setCategory] = useState(location.state.category);
    const [model, setModel] = useState(location.state.model);
    const [brand, setBrand] = useState(location.state.brand);
    const [stock, setStock] = useState(location.state.stock);
    const [isAvailable, setIsAvailable] = useState(location.state.isAvailable);
    
    const navigate = useNavigate();

     if(!location.state){
        window.location.href = "/admin/products";
    }

    async function updateProduct() {
        const token = localStorage.getItem("token");
        if (token === null) {
            toast.error("You must be logged in to update a product.");
            navigate("/login");
            return;
        }

        console.log(files);

        const imagePromises = []

        for (let i = 0; i < files.length; i++) {
            const promise = uploadFile(files[i]);
            imagePromises.push(promise);
        }
        

        const images = await Promise.all(imagePromises).catch((error) => {
            console.error("Error uploading images:", error);
            toast.error("Failed to upload images. Please try again.");
            return;
        });

        if (productID === "" || name === "" || altNames === "" || description === "" || price === "" || labelledPrice === "" || images === "" || category === "" || model === "" || brand === "") {
            toast.error("Please fill in all required fields.");
            return;
        }
        try {
            const altnamesInArray = altNames.split(",").map(name => name.trim());
            
            
            await axios.put(import.meta.env.VITE_BACKEND_URL + "/products/" + productID, {
                productID: productID,
                name: name,
                altNames: altnamesInArray,
                description: description,
                price: price,
                labelledPrice: labelledPrice,
                images: images,
                category: category,
                model: model,
                brand: brand,
                stock: stock,
                isAvailable: isAvailable
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            toast.success("Product updated successfully!");
            navigate("/admin/products");
            
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error("Failed to update product. Please try again.");
        }
    }

    return (
        <div className="w-full h-full flex items-center justify-center p-6 overflow-hidden">
            
            <div className="w-full max-w-6xl bg-accent/10 backdrop-blur-2xl rounded-[3rem] p-12 border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                
                {/* Heading එක Update Product ලෙස වෙනස් කළා */}
                <h1 className="text-3xl font-extrabold text-text mb-10 text-center tracking-tight">Update Product</h1>
                
                <div className="grid grid-cols-2 gap-16">
                    
                    
                    <div className="flex flex-col gap-6">
                        
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <label className="text-[11px] font-extrabold uppercase tracking-widest text-text/70 mb-2">Product ID</label>
                                <input type="text" value={productID} onChange={(e) => setProductID(e.target.value)} placeholder="e.g. P001" className="w-full px-4 py-3 bg-white/60 border border-white/60 rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-sm font-medium text-text placeholder-text/40 shadow-inner" />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-[11px] font-extrabold uppercase tracking-widest text-text/70 mb-2">Product Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Velvet Lip Balm" className="w-full px-4 py-3 bg-white/60 border border-white/60 rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-sm font-medium text-text placeholder-text/40 shadow-inner" />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[11px] font-extrabold uppercase tracking-widest text-text/70 mb-2">Alternative Names</label>
                            <input type="text" value={altNames} onChange={(e) => setAltNames(e.target.value)} placeholder="Comma separated names..." className="w-full px-4 py-3 bg-white/60 border border-white/60 rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-sm font-medium text-text placeholder-text/40 shadow-inner" />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[11px] font-extrabold uppercase tracking-widest text-text/70 mb-2">Description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" placeholder="Enter product description..." className="w-full px-4 py-3 bg-white/60 border border-white/60 rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-sm font-medium text-text placeholder-text/40 shadow-inner resize-none"></textarea>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[11px] font-extrabold uppercase tracking-widest text-text/70 mb-2">Images URLs</label>
                            <input type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files))} placeholder="Paste image links here..." className="w-full px-4 py-3 bg-white/60 border border-white/60 rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-sm font-medium text-text placeholder-text/40 shadow-inner" />
                        </div>

                    </div>

                    
                    <div className="flex flex-col gap-6">
                        
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <label className="text-[11px] font-extrabold uppercase tracking-widest text-text/70 mb-2">Price (Rs)</label>
                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" className="w-full px-4 py-3 bg-white/60 border border-white/60 rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-sm font-medium text-text placeholder-text/40 shadow-inner" />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-[11px] font-extrabold uppercase tracking-widest text-text/70 mb-2">Labelled Price (Rs)</label>
                                <input type="number" value={labelledPrice} onChange={(e) => setLabelledPrice(e.target.value)} placeholder="0.00" className="w-full px-4 py-3 bg-white/60 border border-white/60 rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-sm font-medium text-text placeholder-text/40 shadow-inner" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <label className="text-[11px] font-extrabold uppercase tracking-widest text-text/70 mb-2">Category</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 bg-white/60 border border-white/60 rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-sm font-medium text-text/80 shadow-inner cursor-pointer">
                                    <option value="" disabled>Select category</option>
                                    <option value="Skincare">Skincare</option>
                                    <option value="Makeup">Makeup</option>
                                    <option value="Haircare">Haircare</option>
                                    <option value="Fragrances">Fragrances</option>
                                    <option value="Bath & Body">Bath & Body</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-[11px] font-extrabold uppercase tracking-widest text-text/70 mb-2">Brand</label>
                                <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="e.g. Velvet Co." className="w-full px-4 py-3 bg-white/60 border border-white/60 rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-sm font-medium text-text placeholder-text/40 shadow-inner" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <label className="text-[11px] font-extrabold uppercase tracking-widest text-text/70 mb-2">Model/Variant</label>
                                <input type="text" value={model} onChange={(e) => setModel(e.target.value)} placeholder="e.g. Matte Finish" className="w-full px-4 py-3 bg-white/60 border border-white/60 rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-sm font-medium text-text placeholder-text/40 shadow-inner" />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-[11px] font-extrabold uppercase tracking-widest text-text/70 mb-2">Stock Quantity</label>
                                <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full px-4 py-3 bg-white/60 border border-white/60 rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-sm font-medium text-text placeholder-text/40 shadow-inner" />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[11px] font-extrabold uppercase tracking-widest text-text/70 mb-2">Is Product Available?</label>
                            <select 
                                value={isAvailable} 
                                onChange={(e) => setIsAvailable(e.target.value === "true")}
                                className="w-full px-4 py-3 bg-white/60 border border-white/60 rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-sm font-bold text-text/80 shadow-inner cursor-pointer"
                            >
                                <option value="true">Available</option>
                                <option value="false">Out of Stock</option>
                            </select>
                        </div>

                    </div>
                </div>

                {/* Cancel & Submit Buttons */}
                <div className="flex gap-6 mt-12">
                    <Link 
                        to="/admin/products" 
                        className="w-1/2 py-4 border-2 border-text/80 text-text/80 rounded-2xl flex items-center justify-center hover:bg-text hover:text-background hover:border-text hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-extrabold tracking-[0.25em] text-sm uppercase"
                    >
                        Cancel
                    </Link>
                    
                    <button 
                        onClick={updateProduct}
                        className="w-1/2 py-4 bg-text text-background rounded-2xl hover:bg-[#1a100e] hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 font-extrabold tracking-[0.25em] text-sm uppercase"
                    >
                        Update Product
                    </button>
                </div>

            </div>
        </div>
    );
}