import { Link } from 'react-router-dom';
// Facebook, Instagram, Twitter මෙතනින් ඉවත් කර ඇත
import { ArrowRight, Mail } from 'lucide-react'; 

export default function Footer() {
    return (
        <footer className="w-full bg-text text-background pt-20 pb-10 px-6 md:px-16 lg:px-24 font-sans">
            <div className="max-w-7xl mx-auto">
                
                {/* Top Section - Newsletter & Brand */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 border-b border-secondary/20 pb-16 mb-16">
                    
                    {/* Brand Info */}
                    <div className="w-full lg:w-1/3">
                        <Link to="/" className="inline-block mb-6">
                            <span className="font-velvet text-4xl tracking-widest uppercase text-background">Velvet Co.</span>
                        </Link>
                        <p className="text-secondary/70 text-sm leading-relaxed max-w-sm mb-8">
                            Redefining luxury skincare with 100% natural, cruelty-free ingredients. Elevate your daily ritual with nature's purest essence.
                        </p>
                        <div className="flex items-center gap-5">
                            {/* Instagram SVG */}
                            <a href="#" className="w-10 h-10 rounded-full border border-secondary/30 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                                </svg>
                            </a>
                            {/* Facebook SVG */}
                            <a href="#" className="w-10 h-10 rounded-full border border-secondary/30 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </a>
                            {/* Twitter SVG */}
                            <a href="#" className="w-10 h-10 rounded-full border border-secondary/30 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="w-full lg:w-1/3">
                        <h3 className="font-velvet text-2xl mb-4">Join The Velvet Club</h3>
                        <p className="text-secondary/70 text-xs mb-6">
                            Subscribe to receive updates, access to exclusive deals, and more.
                        </p>
                        <form className="relative flex items-center w-full max-w-md">
                            <Mail className="absolute left-4 w-4 h-4 text-secondary/50" />
                            <input 
                                type="email" 
                                placeholder="Enter your email address" 
                                className="w-full bg-transparent border border-secondary/30 rounded-full py-3.5 pl-12 pr-14 text-sm text-background placeholder:text-secondary/40 focus:outline-none focus:border-primary transition-colors"
                            />
                            <button type="button" className="absolute right-2 w-9 h-9 bg-background text-text rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Middle Section - Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-xs uppercase tracking-widest text-primary mb-2">Shop</h4>
                        <Link to="/products?category=skincare" className="text-sm text-secondary/70 hover:text-accent transition-colors">Skincare</Link>
                        <Link to="/products?category=makeup" className="text-sm text-secondary/70 hover:text-accent transition-colors">Makeup</Link>
                        <Link to="/products?category=fragrances" className="text-sm text-secondary/70 hover:text-accent transition-colors">Fragrances</Link>
                        <Link to="/products?category=body" className="text-sm text-secondary/70 hover:text-accent transition-colors">Bath & Body</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-xs uppercase tracking-widest text-primary mb-2">About Us</h4>
                        <Link to="/about" className="text-sm text-secondary/70 hover:text-accent transition-colors">Our Story</Link>
                        <Link to="/ingredients" className="text-sm text-secondary/70 hover:text-accent transition-colors">Ingredients</Link>
                        <Link to="/sustainability" className="text-sm text-secondary/70 hover:text-accent transition-colors">Sustainability</Link>
                        <Link to="/careers" className="text-sm text-secondary/70 hover:text-accent transition-colors">Careers</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-xs uppercase tracking-widest text-primary mb-2">Customer Care</h4>
                        <Link to="/contact" className="text-sm text-secondary/70 hover:text-accent transition-colors">Contact Us</Link>
                        <Link to="/faq" className="text-sm text-secondary/70 hover:text-accent transition-colors">FAQ</Link>
                        <Link to="/shipping" className="text-sm text-secondary/70 hover:text-accent transition-colors">Shipping & Returns</Link>
                        <Link to="/track-order" className="text-sm text-secondary/70 hover:text-accent transition-colors">Track Order</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-xs uppercase tracking-widest text-primary mb-2">Legal</h4>
                        <Link to="/terms" className="text-sm text-secondary/70 hover:text-accent transition-colors">Terms of Service</Link>
                        <Link to="/privacy" className="text-sm text-secondary/70 hover:text-accent transition-colors">Privacy Policy</Link>
                        <Link to="/refund" className="text-sm text-secondary/70 hover:text-accent transition-colors">Refund Policy</Link>
                    </div>
                </div>

                {/* Bottom Section - Copyright */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-secondary/20 text-xs text-secondary/50">
                    <p>&copy; {new Date().getFullYear()} Velvet Co. All rights reserved.</p>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <span>Sri Lanka (LKR)</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}