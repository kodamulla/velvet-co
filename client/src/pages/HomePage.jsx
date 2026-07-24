import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Play, Leaf, ShieldCheck, Rabbit, Droplets, FlaskConical } from 'lucide-react';

export default function HomePage() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    
    // Parallax Logic - වේගය අඩු කර Fade-out එකක් එකතු කර ඇත
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]); 
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]); // Scroll කරනවිට මැකී යයි

    const categories = [
        { name: "Skincare", count: "12 Products", img: "/skincare.jpg" },
        { name: "Makeup", count: "24 Products", img: "/makeup.jpg" },
        { name: "Haircare", count: "18 Products", img: "/haircare.jpg" },
        { name: "Fragrances", count: "15 Products", img: "/fragrances.jpg" },
        { name: "Bath & Body", count: "20 Products", img: "/bath-body.jpg" }
    ];

    return (
        <div className="w-full min-h-screen bg-background text-text selection:bg-accent selection:text-background font-sans overflow-hidden">
            
            {/* 1. HERO SECTION */}
            {/* මෙතනින් overflow-hidden ඉවත් කර ඇත */}
            <section ref={heroRef} className="relative w-full h-[100vh] lg:h-[95vh] flex flex-col md:flex-row items-center pt-24 px-6 md:px-16 lg:px-24 bg-gradient-to-r from-background to-secondary/30">
                
                {/* Left Text Content - Fade out effect added */}
                <motion.div style={{ y: textY, opacity: heroOpacity }} className="z-20 w-full md:w-[50%] flex flex-col items-start mt-10 md:mt-0">
                    <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-6">
                        New Collection
                    </motion.span>
                    
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="font-velvet text-6xl md:text-[5.5rem] lg:text-[6.5rem] leading-[1.05] tracking-tight text-text mb-6">
                        Reveal Your <br/>
                        <span className="text-accent">Natural</span> Glow
                    </motion.h1>
                    
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="max-w-[380px] text-text/70 text-sm md:text-base leading-relaxed mb-10">
                        Discover skincare that enhances your natural beauty. Gentle, effective, and made for you.
                    </motion.p>
                    
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }} className="flex flex-wrap items-center gap-6 mb-16">
                        <Link to="/products" className="bg-text text-background px-8 py-4 rounded-full text-sm font-medium hover:bg-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                            Shop Now <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button className="flex items-center gap-3 text-text font-semibold text-sm hover:text-accent transition-colors group">
                            <span className="w-12 h-12 rounded-full bg-background border border-secondary flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                <Play className="w-4 h-4 fill-current ml-1" />
                            </span>
                            Watch Video
                        </button>
                    </motion.div>

                    {/* Trust Badges */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }} className="flex items-center gap-8 md:gap-12 opacity-80">
                        <div className="flex items-center gap-3">
                            <Leaf className="w-6 h-6 text-primary stroke-[1.5]" />
                            <div className="flex flex-col"><span className="text-xs font-bold text-text">Natural Ingredients</span><span className="text-[10px] text-text/60">Safe & Organic</span></div>
                        </div>
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-6 h-6 text-primary stroke-[1.5]" />
                            <div className="flex flex-col"><span className="text-xs font-bold text-text">Dermatologist Tested</span><span className="text-[10px] text-text/60">Clinically Proven</span></div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Rabbit className="w-6 h-6 text-primary stroke-[1.5]" />
                            <div className="flex flex-col"><span className="text-xs font-bold text-text">Cruelty Free</span><span className="text-[10px] text-text/60">Love Animals</span></div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Hero Image - Fade out effect added */}
                <motion.div style={{ y: imageY, opacity: heroOpacity }} className="absolute right-0 bottom-0 w-[80%] md:w-[60%] lg:w-[55%] h-[70vh] md:h-full z-10 flex items-end justify-end pointer-events-none">
                    <motion.img 
                        initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, ease: "easeOut" }}
                        src="/model.png" 
                        alt="Model" 
                        className="w-full h-full object-contain mix-blend-multiply opacity-95 object-right-bottom drop-shadow-2xl"
                    />
                    
                    {/* Floating Offer Badge */}
                    <motion.div 
                        animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[20%] right-[10%] md:right-[20%] w-24 h-24 md:w-28 md:h-28 bg-background/80 backdrop-blur-md rounded-full flex flex-col items-center justify-center shadow-lg border border-secondary pointer-events-auto"
                    >
                        <span className="text-text font-extrabold text-xl md:text-2xl">20% <span className="text-sm">OFF</span></span>
                        <span className="text-[10px] font-medium text-text/70 text-center leading-tight mt-1">For New<br/>Customers</span>
                    </motion.div>
                </motion.div>
            </section>

            {/* 2. CATEGORIES SECTION */}
            <section className="w-full py-24 px-6 md:px-16 lg:px-24 bg-background relative z-30">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true, margin: "-50px" }} 
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <h2 className="font-velvet text-4xl md:text-5xl text-text">Shop By Categories</h2>
                </motion.div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-8">
                    {categories.map((cat, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 50, scale: 0.95, filter: "blur(5px)" }} 
                            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} 
                            viewport={{ once: true, margin: "-50px" }} 
                            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 0.8, 0.25, 1] }}
                        >
                            <Link to={`/products?category=${cat.name.toLowerCase()}`} className="group flex flex-col items-center">
                                
                                <div className="w-full aspect-[4/5] bg-secondary/20 rounded-[2rem] overflow-hidden mb-6 relative shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2">
                                    <img 
                                        src={cat.img} 
                                        alt={cat.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                    />
                                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                
                                <h3 className="text-text font-velvet font-bold text-xl mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
                                <p className="text-[11px] text-text/50 uppercase tracking-widest">{cat.count}</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 3. PROMO BANNER SECTION (Slimmer Height, Full Width) */}
            <section className="w-full py-12 px-6 md:px-16 lg:px-24 bg-background">
                <motion.div 
                    initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                    className="relative w-full rounded-[2.5rem] overflow-hidden min-h-[350px] flex items-center p-6 md:p-10 lg:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img src="/promo-banner.jpg" alt="Promo Background" className="w-full h-full object-cover object-center" />
                        {/* Elegant Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent"></div>
                    </div>

                    {/* Content over the image */}
                    <div className="relative z-10 w-full md:w-[60%] lg:w-[45%]">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
                            className="bg-white/30 backdrop-blur-2xl border border-white/60 p-6 md:p-8 rounded-3xl shadow-2xl inline-block"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <Sparkles className="w-4 h-4 text-primary" />
                                <span className="text-primary text-[10px] md:text-xs font-bold tracking-widest uppercase">Glow Every Day</span>
                            </div>
                            
                            <h2 className="font-velvet text-3xl md:text-4xl lg:text-5xl text-text leading-[1.1] mb-4">
                                Skincare That <br/>
                                <span className="text-accent italic font-light">Loves</span> You Back.
                            </h2>
                            
                            <p className="text-text/70 text-xs md:text-sm leading-relaxed mb-6 max-w-sm">
                                Elevate your daily routine with our award-winning formulas. Infused with rare botanicals.
                            </p>
                            
                            <Link to="/products" className="inline-flex items-center gap-2 bg-text text-background px-6 py-3 rounded-full text-[10px] md:text-xs font-semibold uppercase hover:bg-primary transition-all duration-300 hover:shadow-[0_10px_30px_rgba(163,145,132,0.3)] hover:-translate-y-1">
                                Explore The Offer <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* 4. BRAND PHILOSOPHY / THE VELVET STANDARD */}
            <section className="w-full py-32 px-6 md:px-16 lg:px-24 bg-secondary/20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <motion.span 
                            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 block"
                        >
                            Our Philosophy
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                            className="font-velvet text-5xl md:text-6xl text-text"
                        >
                            The Velvet <span className="italic text-accent">Standard.</span>
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center shadow-sm mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:bg-primary group-hover:text-white text-primary">
                                <Leaf className="w-8 h-8 stroke-[1.5] transition-colors" />
                            </div>
                            <h3 className="font-velvet text-2xl text-text font-bold mb-4">Pure Botanicals</h3>
                            <p className="text-sm text-text/60 leading-relaxed px-4">
                                Sourced directly from nature. We use only the highest quality organic ingredients to nourish your skin without harsh chemicals.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center shadow-sm mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:bg-primary group-hover:text-white text-primary">
                                <FlaskConical className="w-8 h-8 stroke-[1.5] transition-colors" />
                            </div>
                            <h3 className="font-velvet text-2xl text-text font-bold mb-4">Clinically Proven</h3>
                            <p className="text-sm text-text/60 leading-relaxed px-4">
                                Every formula is rigorously tested by dermatologists to ensure maximum efficacy and safety for even the most sensitive skin types.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center shadow-sm mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:bg-primary group-hover:text-white text-primary">
                                <Droplets className="w-8 h-8 stroke-[1.5] transition-colors" />
                            </div>
                            <h3 className="font-velvet text-2xl text-text font-bold mb-4">Deep Hydration</h3>
                            <p className="text-sm text-text/60 leading-relaxed px-4">
                                Designed to penetrate deep into the skin layers, locking in moisture and restoring your natural, youthful radiance from within.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
            
        </div>
    );
}