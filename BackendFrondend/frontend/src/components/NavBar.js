// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  const linkStyle = {
    marginRight: '10px',
    textDecoration: 'none',
    color: 'blue',
    fontWeight: 'bold'
  };

  return (
    <nav style={{ marginBottom: '20px' }}>
      <Link to="/owners" style={linkStyle}>Owners</Link>
      <Link to="/vets" style={linkStyle}>Vets</Link>
      <Link to="/pets" style={linkStyle}>Pets</Link>
      <Link to="/appointments" style={linkStyle}>Appointments</Link>
      <Link to="/records" style={linkStyle}>Records</Link>
      <Link to="/prescriptions" style={linkStyle}>Prescriptions</Link>
    </nav>
  );
}

export default NavBar;