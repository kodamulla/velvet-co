import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <div className="w-full min-h-screen bg-background font-sans text-text">
        <Routes>
          
          
          <Route path="/*" element={<><Header /><HomePage /></>} />

          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;