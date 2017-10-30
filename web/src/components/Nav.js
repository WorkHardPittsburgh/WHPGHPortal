import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <nav className="nav-header">
    <div className="nav-item">
          <Link to="/tasks">Tasks</Link>
        </div>
        <div className="nav-item">
          <Link to="/uptakes">Uptake</Link>
        </div>
        <div className="nav-item">
          <Link to="/projects">Projects</Link>
        </div>
        <div className="nav-item">
          <Link to="/clients">Clients</Link>
    </div>
  </nav>
)
export default Nav;