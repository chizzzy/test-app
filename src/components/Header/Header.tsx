import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export const Header: React.FC = () => {
  return (
    <nav className="header-nav">
      <ul className="header-list">
        <li className="header-item">
          <Link to="/" className="header-link">
            Home
          </Link>
        </li>
        <li className="header-item">
          <Link to="/add-product" className="header-link">
            Add Product
          </Link>
        </li>
      </ul>
    </nav>
  );
};
