import { useState } from "react";

export default function ImageSlider(props) {
    const images = props.images || [];
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="w-full flex flex-col items-center gap-6">
            {/* Main Display Image */}
            <div className="w-full max-w-md h-[400px] bg-white rounded-3xl shadow-sm border border-stone-100 flex items-center justify-center p-4 overflow-hidden">
                <img 
                    src={images[activeIndex]} 
                    alt="Product Preview" 
                    className="w-full h-full object-contain transition-opacity duration-500"
                />
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex flex-row justify-center items-center gap-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                    <button 
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                            index === activeIndex 
                                ? "border-stone-900 scale-105 shadow-md" 
                                : "border-transparent hover:border-stone-300"
                        }`}
                    >
                        <img 
                            src={image} 
                            alt={`Thumbnail ${index}`} 
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}