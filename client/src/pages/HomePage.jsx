import { Routes, Route } from 'react-router-dom';
import Header from '../components/header';




export default function HomePage() {
    return (
        <div>
            <Header />
            
            <div className="w-full min-h-screen  pt-32 px-10 bg-secondary">
                <Routes>
                    
                    <Route path="/" element={<h1 className="text-4xl font-velvet text-text">Home Page Content</h1>} />
                    
                    
                    <Route path="/products" element={<h1 className="text-4xl font-velvet text-text">Products Page</h1>} />
                    
                    <Route path="/about" element={<h1 className="text-4xl font-velvet text-text">About Page</h1>} />
                    
                    <Route path="/contact" element={<h1 className="text-4xl font-velvet text-text">Contact Page</h1>} />
                    
                    <Route path="/*" element={<h1 className="text-4xl font-bold text-red-500">404 Not Found</h1>} />
                    
                </Routes>
            </div>
            
        </div>
    );
}