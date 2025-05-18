// src/components/NavBar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/owners" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Owners</NavLink>
      <NavLink to="/vets" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Vets</NavLink>
      <NavLink to="/pets" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Pets</NavLink>
      <NavLink to="/appointments" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Appointments</NavLink>
      <NavLink to="/records" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Records</NavLink>
      <NavLink to="/prescriptions" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Prescriptions</NavLink>
    </nav>
  );
}

export default NavBar;