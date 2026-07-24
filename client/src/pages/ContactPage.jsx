import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="w-full min-h-screen  text-text font-sans selection:bg-accent selection:text-background pb-20">
            
            {/* HERO SECTION */}
            <section className="relative w-full bg-accent pt-36 pb-16 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-secondary/30 to-background flex flex-col items-center text-center">
                <motion.span 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                    className="text-primary text-xs font-bold tracking-[0.4em] uppercase mb-4 block"
                >
                    Get In Touch
                </motion.span>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-velvet text-5xl md:text-7xl text-text leading-tight mb-6"
                >
                    We'd Love to <br className="md:hidden" /> <span className="italic text-accent">Hear</span> From You.
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                    className="max-w-xl text-text/70 text-sm md:text-base leading-relaxed"
                >
                    Whether you have a question about our ingredients, need help finding the perfect routine, or just want to share your Velvet Co. experience, our team is here for you.
                </motion.p>
            </section>

            {/* MAIN CONTACT SECTION */}
            <section className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto mt-8">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    
                    {/* LEFT COLUMN - Contact Information */}
                    <motion.div 
                        initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                        className="w-full lg:w-5/12 flex flex-col space-y-10"
                    >
                        <div>
                            <h3 className="font-velvet text-3xl text-text mb-6">Contact Information</h3>
                            <p className="text-text/60 text-sm leading-relaxed mb-8">
                                Reach out to us through any of the following channels. We aim to respond to all inquiries within 24 hours.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-5 group">
                                <div className="w-12 h-12 bg-secondary/30 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors duration-300 shrink-0">
                                    <Mail className="w-5 h-5 stroke-[1.5]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-text mb-1 uppercase tracking-wider">Email Us</h4>
                                    <a href="mailto:hello@velvetco.lk" className="text-sm text-text/70 hover:text-accent transition-colors">hello@velvetco.lk</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 group">
                                <div className="w-12 h-12 bg-secondary/30 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors duration-300 shrink-0">
                                    <Phone className="w-5 h-5 stroke-[1.5]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-text mb-1 uppercase tracking-wider">Call Us</h4>
                                    <a href="tel:+94112345678" className="text-sm text-text/70 hover:text-accent transition-colors">+94 11 234 5678</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 group">
                                <div className="w-12 h-12 bg-secondary/30 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors duration-300 shrink-0">
                                    <MapPin className="w-5 h-5 stroke-[1.5]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-text mb-1 uppercase tracking-wider">Visit Us</h4>
                                    <p className="text-sm text-text/70 leading-relaxed">
                                        75 Rosmead Place,<br />
                                        Colombo 07,<br />
                                        Sri Lanka.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 group">
                                <div className="w-12 h-12 bg-secondary/30 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors duration-300 shrink-0">
                                    <Clock className="w-5 h-5 stroke-[1.5]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-text mb-1 uppercase tracking-wider">Opening Hours</h4>
                                    <p className="text-sm text-text/70 leading-relaxed">
                                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                                        Saturday: 10:00 AM - 2:00 PM
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN - Contact Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full lg:w-7/12"
                    >
                        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-secondary/20">
                            <h3 className="font-velvet text-3xl text-text mb-8">Send a Message</h3>
                            
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="firstName" className="text-[11px] font-bold uppercase tracking-widest text-primary">First Name</label>
                                        <input 
                                            type="text" 
                                            id="firstName" 
                                            placeholder="Jane"
                                            className="w-full bg-background border border-secondary/50 rounded-xl px-5 py-4 text-sm text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="lastName" className="text-[11px] font-bold uppercase tracking-widest text-primary">Last Name</label>
                                        <input 
                                            type="text" 
                                            id="lastName" 
                                            placeholder="Doe"
                                            className="w-full bg-background border border-secondary/50 rounded-xl px-5 py-4 text-sm text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-widest text-primary">Email Address</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        placeholder="jane@example.com"
                                        className="w-full bg-background border border-secondary/50 rounded-xl px-5 py-4 text-sm text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-[11px] font-bold uppercase tracking-widest text-primary">Subject</label>
                                    <select 
                                        id="subject" 
                                        className="w-full bg-background border border-secondary/50 rounded-xl px-5 py-4 text-sm text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all appearance-none"
                                    >
                                        <option value="">Select a topic...</option>
                                        <option value="order">Order Inquiry</option>
                                        <option value="product">Product Information</option>
                                        <option value="return">Returns & Refunds</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-[11px] font-bold uppercase tracking-widest text-primary">Message</label>
                                    <textarea 
                                        id="message" 
                                        rows="5"
                                        placeholder="How can we help you today?"
                                        className="w-full bg-background border border-secondary/50 rounded-xl px-5 py-4 text-sm text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                                    ></textarea>
                                </div>

                                <button 
                                    type="button" 
                                    className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-text text-background px-10 py-4 rounded-full text-xs font-semibold uppercase hover:bg-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1 mt-4"
                                >
                                    Send Message <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </motion.div>

                </div>
            </section>
        </div>
    );
}