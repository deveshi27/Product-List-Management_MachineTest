import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductDetail from './components/ProductDetail';

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
  };

  return (
    <Router>
      <nav className='flex m-0 p-8 font-semibold text-xl justify-between items-center bg-gray-300 h-[40px] w-full'>
        <Link to="/" style={{ marginRight: '10px' }}>Products</Link>
        {isAuth
          ? <button onClick={handleLogout}>Logout ↪️</button>
          : <Link to="/login">Login ↩️</Link>
        }
      </nav>

      <Routes>
        <Route path="/" element={<ProductList isAuth={isAuth} />} />
        <Route path="/login" element={isAuth ? <Navigate to="/" /> : <Login setAuth={setIsAuth} />} />
        <Route path="/create" element={isAuth ? <ProductForm /> : <Navigate to="/login" />} />
        <Route path="/edit/:id" element={isAuth ? <ProductForm /> : <Navigate to="/login" />} />
        <Route path="/product/:id" element={<ProductDetail isAuth={isAuth} />} />
      </Routes>

    </Router>
  );
}

export default App;


