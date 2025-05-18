// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import VetsPage from './pages/VetsPage';
import PetsPage from './pages/PetsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import RecordsPage from './pages/RecordsPage';
import PrescriptionsPage from './pages/PrescriptionsPage';
import OwnersPage from './pages/ownersPage';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div style={{ padding: '20px' }}>
      {!isLoginPage && <h1>Vet Clinic Dashboard</h1>}
      {!isLoginPage && <NavBar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/owners" element={<OwnersPage />} />
        <Route path="/vets" element={<VetsPage />} />
        <Route path="/pets" element={<PetsPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/records" element={<RecordsPage />} />
        <Route path="/prescriptions" element={<PrescriptionsPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
