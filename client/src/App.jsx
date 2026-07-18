import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

import AdminPage from './pages/AdminPage';
import ProductPage from './pages/ProductPage';
import ProductOverview from './pages/ProductOverview';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import { Toaster } from 'react-hot-toast';
 import { GoogleOAuthProvider } from "@react-oauth/google";

// 310342769413-knfmiorsv77d38to0tjf0j7sj21utujs.apps.googleusercontent.com


function App() {
  return (
     <GoogleOAuthProvider clientId="310342769413-knfmiorsv77d38to0tjf0j7sj21utujs.apps.googleusercontent.com">
    <BrowserRouter>
      <Toaster position="top-right"/>
      <div className="w-full min-h-screen bg-background font-sans text-text ">
        <Routes>
          
          <Route path="/" element={<><Header /><HomePage /></>} />
          <Route path="/products" element={<><Header /><ProductPage /></>} />
          <Route path="/overview/:productID" element={<><Header /><ProductOverview /></>} />
          <Route path="/cart" element={<><Header /><CartPage /></>} />
          <Route path="/checkout" element={<><Header /><CheckoutPage /></>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          
          
          <Route path="/*" element={<><Header /><HomePage /></>} />
        </Routes>
      </div>
    </BrowserRouter>
     </GoogleOAuthProvider>
  )
}

export default App;