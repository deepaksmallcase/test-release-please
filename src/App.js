import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '20px' }}>
            <li>
              <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>Home</Link>
            </li>
            <li>
              <Link to="/about" style={{ textDecoration: 'none', color: '#007bff' }}>About</Link>
            </li>
          </ul>
        </nav>
        
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App; 