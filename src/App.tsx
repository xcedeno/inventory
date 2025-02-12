// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Categories from './pages/Categories';
import ActiveInventory from './pages/ActiveInventory';
import Discontinued from './pages/Discontinued';
import Damaged from './pages/Damaged';
import Locations from './pages/Locations';
import AddEquipment from './pages/AddEquipment'; // Importar la nueva página
import 'bootstrap-icons/font/bootstrap-icons.css';
import CategoryDetail from './pages/CategoryDetail';

import './global.css';

const App: React.FC = () => {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(window.innerWidth < 768);

  const handleToggleCollapse = (isCollapsed: boolean) => {
    setIsNavbarCollapsed(isCollapsed);
  };

  return (
    <Router>
      <div className="d-flex">
        <Navbar onToggleCollapse={handleToggleCollapse} />
        <div className="flex-grow-1 p-4" style={{ marginLeft: isNavbarCollapsed ? '80px' : '250px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:categoryName" element={<CategoryDetail />} />
            <Route path="/active-inventory" element={<ActiveInventory />} />
            <Route path="/discontinued" element={<Discontinued />} />
            <Route path="/damaged" element={<Damaged />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/add-equipment" element={<AddEquipment />} /> {/* Nueva ruta */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;