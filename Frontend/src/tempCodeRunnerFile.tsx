import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';


export default function App(): JSX.Element {
return (
<BrowserRouter>
<div className="min-h-screen bg-gradient-to-b from-[#071327] to-[#001025] text-white font-sans">
<Header />
<main className="px-6 pb-12">
<Routes>
<Route path="/" element={<HomePage />} />
</Routes>
</main>
<Footer />
</div>
</BrowserRouter>
);
}