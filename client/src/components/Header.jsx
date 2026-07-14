import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  
  return (
   
    <header className="fixed top-0 w-full z-50 px-8 py-5 flex items-center justify-between">
      
      
      <div className="flex-shrink-0">
        <Link to="/">
          <img 
            src="/logo.png" 
            alt="Velvet Co. Logo" 
            className="w-24 h-24 object-contain hover:scale-105 transition-transform duration-300" 
          />
        </Link>
      </div>

      {/* 2. මැද තියෙන Menu එක (Glassmorphism Design එක සහ අලුත් Icons) */}
      <nav className="hidden md:flex items-center bg-white/60 backdrop-blur-md border border-secondary/60 rounded-full p-1.5 shadow-sm gap-2">
        
        {/* Home Link */}
        <Link to="/" className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-text/70 hover:text-text hover:bg-secondary/30 transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          Home
        </Link>

        {/* Products Link */}
        <Link to="/products" className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-text/70 hover:text-text hover:bg-secondary/30 transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          Products
        </Link>

        {/* About Link */}
        <Link to="/about" className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-text/70 hover:text-text hover:bg-secondary/30 transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          About
        </Link>

        {/* Contact Link */}
        <Link to="/contact" className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-text/70 hover:text-text hover:bg-secondary/30 transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          Contact
        </Link>

      </nav>

      {/* 3. දකුණු පැත්තේ Buttons (Cart & Sign In) */}
      <div className="flex items-center gap-5">
        
        {/* Cart Icon Button */}
        <button className="w-11 h-11 flex items-center justify-center bg-background rounded-[14px] shadow-sm border border-secondary hover:border-primary transition-colors text-text">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
        </button>

        {/* Divider Line */}
        <div className="w-px h-7 bg-primary/40 hidden sm:block"></div>

        {/* Sign In Button */}
        <Link to="/login" className="hidden sm:flex items-center gap-2 bg-text text-background px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide hover:bg-[#2b1b18] transition-colors shadow-md">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          SIGN IN
        </Link>

      </div>
    </header>
  );
}