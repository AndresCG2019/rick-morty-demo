import React from 'react';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}></Route>
          <Route path='about' element={<About/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
