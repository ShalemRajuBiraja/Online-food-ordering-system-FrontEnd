import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
 import { ToastContainer } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';  // ⚠️ Must import CSS

import Home from './pages/Home.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import MyOrders from './pages/MyOrders.jsx';
import ViewCart from './pages/ViewCart.jsx';
import AdminLogin from './pages/AdminLogin.jsx';


import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>

      {/* Login Modal Globally Available */}
      <Login />
      {/* Signup Modal Globally Available */}
      <Signup />
     

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/viewcart" element={<ViewCart />} /> 
        <Route path="/products" element={<Home />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
      </Routes>

    </BrowserRouter>

  </StrictMode>
);