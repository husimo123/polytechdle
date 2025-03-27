import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Classic from './pages/Classic';
import PhD from './pages/PhD';
import Photo from './pages/Photo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/classic" element={<Classic />} />
      <Route path="/phd" element={<PhD />} />
      <Route path="/photo" element={<Photo />} />
    </Routes>
  );
}

export default App;
