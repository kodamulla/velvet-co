import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"; // useLocation එකතු කළා
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import OrdersPage from './pages/OrdersPage';
import AdminPage from './pages/AdminPage';
import ProductPage from './pages/ProductPage';
import ProductOverview from './pages/ProductOverview';
import RegisterPage from './pages/RegisterPage';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactLenis } from '@studio-freight/react-lenis';

// 310342769413-knfmiorsv77d38to0tjf0j7sj21utujs.apps.googleusercontent.com

// 1. Routes සහ Footer එක පාලනය කරන Component එක
function MainLayout() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="w-full min-h-screen bg-background font-sans text-text flex flex-col">
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<><Header /><HomePage /></>} />
          <Route path="/about" element={<><Header /><AboutPage /></>} />
          <Route path="/contact" element={<><Header /><ContactPage /></>} />
          <Route path="/products" element={<><Header /><ProductPage /></>} />
          <Route path="/overview/:productID" element={<><Header /><ProductOverview /></>} />
          <Route path="/cart" element={<><Header /><CartPage /></>} />
          <Route path="/checkout" element={<><Header /><CheckoutPage /></>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/orders" element={<><Header /><OrdersPage /></>} />
          <Route path="/*" element={<><Header /><HomePage /></>} />
        </Routes>
      </div>
      {/* Admin පිටුවලදී පමණක් Footer එක නොපෙන්වයි */}
      {!isAdminPage && <Footer />}
    </div>
  );
}

// 2. ප්‍රධාන App Component එක (Providers සියල්ලම තියෙන්නේ මෙතනයි)
function App() {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothTouch: true }}>
      <GoogleOAuthProvider clientId="310342769413-knfmiorsv77d38to0tjf0j7sj21utujs.apps.googleusercontent.com">
        <BrowserRouter>
          <Toaster position="top-right"/>
          <MainLayout />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </ReactLenis>
  );
}

export default App;