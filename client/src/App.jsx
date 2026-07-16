import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import ProductPage from './pages/ProductPage';
import ProductOverview from './pages/ProductOverview';
import RegisterPage from './pages/RegisterPage';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right"/>
      <div className="w-full min-h-screen bg-background font-sans text-text pt-24">
        <Routes>
          {/* අනිත් Routes ටික මුලින් දාන්න */}
          <Route path="/" element={<><Header /><HomePage /></>} />
          <Route path="/products" element={<><Header /><ProductPage /></>} />
          <Route path="/overview/:productID" element={<><Header /><ProductOverview /></>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          
          {/* අන්තිමටම /* දාන්න */}
          <Route path="/*" element={<><Header /><HomePage /></>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;