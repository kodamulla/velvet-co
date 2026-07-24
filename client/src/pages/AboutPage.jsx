import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Droplets, Leaf, Heart, FlaskConical } from 'lucide-react';

export default function AboutPage() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    
    // Parallax & Fade-out Effects
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <div className="w-full min-h-screen bg-background text-text font-sans selection:bg-accent selection:text-background">
            
            {/* 1. HERO SECTION */}
            <section ref={heroRef} className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                <motion.div style={{ y: imageY, opacity: heroOpacity }} className="absolute inset-0 z-0">
                    {/* Public ෆෝල්ඩරයට about-hero.jpg නමින් පින්තූරයක් දාන්න */}
                    <img src="/about-story.jpg" alt="About Velvet Co" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-text/40"></div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
                    className="relative z-10 text-center px-6"
                >
                    <span className="text-background/80 text-xs font-bold tracking-[0.4em] uppercase mb-4 block">
                        Our Genesis
                    </span>
                    <h1 className="font-velvet text-5xl md:text-7xl text-background leading-tight">
                        The Story of <br/>
                        <span className="italic text-accent">Velvet Co.</span>
                    </h1>
                </motion.div>
            </section>

            {/* 2. OUR STORY SECTION */}
            <section className="py-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    <motion.div 
                        initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 relative"
                    >
                        <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-secondary/30 relative z-10">
                            {/* Public ෆෝල්ඩරයට about-story.jpg නමින් පින්තූරයක් දාන්න */}
                            <img src="/about-hero.jpg" alt="Our Story" className="w-full h-full object-cover" />
                        </div>
                        {/* Decorative Background Element */}
                        <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-accent/20 rounded-full blur-3xl z-0"></div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full lg:w-1/2"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-primary text-xs font-bold tracking-widest uppercase">How It Started</span>
                        </div>
                        <h2 className="font-velvet text-4xl md:text-5xl text-text mb-8 leading-[1.1]">
                            Born from a desire for <span className="italic text-accent">uncompromised</span> purity.
                        </h2>
                        <div className="space-y-6 text-text/70 text-sm md:text-base leading-relaxed">
                            <p>
                                Velvet Co. was founded on a simple yet powerful belief: skincare should be a luxurious ritual that nourishes not just your skin, but your soul. We noticed a gap in the market for products that were both scientifically effective and deeply grounded in nature.
                            </p>
                            <p>
                                After years of research alongside top dermatologists and botanists, we crafted our signature line. Every bottle is a testament to our dedication to quality, blending rare botanical extracts with modern skincare science.
                            </p>
                            <p>
                                We don't just create products; we create moments of self-care that you can look forward to every single day.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. CORE VALUES SECTION */}
            <section className="py-24 px-6 md:px-16 lg:px-24 bg-accent/30">
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-velvet text-4xl md:text-5xl text-text">Our Core <span className="italic text-accent">Values</span></h2>
                        <p className="text-text/60 mt-4 max-w-2xl mx-auto text-sm">The pillars that guide everything we do, from sourcing to your daily skincare routine.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Leaf, title: "100% Natural", desc: "Sourced directly from the earth, free from synthetic additives." },
                            { icon: Heart, title: "Cruelty Free", desc: "We love animals. Our products are never tested on them." },
                            { icon: FlaskConical, title: "Science Backed", desc: "Formulated with clinically proven active ingredients." },
                            { icon: Droplets, title: "Sustainable", desc: "Eco-friendly packaging and responsible sourcing." }
                        ].map((item, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-background p-8 rounded-[2rem] text-center shadow-sm hover:shadow-xl transition-shadow duration-300 border border-transparent hover:border-accent/20"
                            >
                                <div className="w-16 h-16 mx-auto bg-secondary/30 rounded-full flex items-center justify-center text-primary mb-6">
                                    <item.icon className="w-6 h-6 stroke-[1.5]" />
                                </div>
                                <h3 className="font-velvet text-xl font-bold text-text mb-3">{item.title}</h3>
                                <p className="text-text/60 text-xs leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. CALL TO ACTION */}
            <section className="py-24 px-6 text-center">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="font-velvet text-4xl md:text-5xl text-text mb-6">Ready to experience the <span className="italic text-accent">difference?</span></h2>
                    <p className="text-text/60 mb-10 text-sm md:text-base">Explore our curated collection and find the perfect match for your skin.</p>
                    <Link to="/products" className="inline-flex items-center gap-3 bg-text text-background px-8 py-4 rounded-full text-xs font-semibold uppercase hover:bg-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        Shop The Collection <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </section>

        </div>
    );
}