import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Импортируем компоненты
import Header from './components/Header';
import Footer from './components/Footer';

// Импортируем страницы
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

import './App.css';

export default function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog.html" element={<Catalog />} />
        <Route path="/catalog/:id.html" element={<Product />} />
        <Route path="/about.html" element={<About />} />
        <Route path="/contacts.html" element={<Contacts />} />

        <Route path="/cart.html" element={<Cart />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}