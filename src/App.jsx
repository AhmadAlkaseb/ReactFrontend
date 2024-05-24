import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import ProtectedRoute from './features/ProtectedRoutes';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './layout/AppLayout';
import Loguot from './pages/Loguot';
import ItemsForSale from './pages/ItemsForSale';
import SetItemForSale from './pages/SetItemForSale';
import MyItemsPage from './pages/MyListedItems/MyItemsPage';
import Item from './pages/Item';
import AdministrationPage from './pages/admin/AdministrationPage.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('token') ? true : false;
  });
  const [role, setRole] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} />
        <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="*" element={<PageNotFound />} />
        <Route element={<AppLayout role={role}/>}>
          <Route path="/home" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Home /></ProtectedRoute>} />
          <Route path="/itemsforsale" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ItemsForSale /></ProtectedRoute>} />
          <Route path="/setitemforsale" element={<ProtectedRoute isAuthenticated={isAuthenticated}><SetItemForSale /></ProtectedRoute>} />
          <Route path="/item/:itemid" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Item /></ProtectedRoute>} />
          <Route path="/mylisteditems" element={<ProtectedRoute isAuthenticated={isAuthenticated}><MyItemsPage /></ProtectedRoute>} />
          <Route path="/logout" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Loguot /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AdministrationPage /></ProtectedRoute>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
