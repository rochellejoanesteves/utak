import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/navbar';
import Create from './pages/create';
import Home from './pages/home';


function App() {
  return (
    <div>
      <BrowserRouter>
       <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
