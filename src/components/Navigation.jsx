import React from 'react';
import { FiHome, FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">
            <FiHome />
          </Link>
        </li>
        <li>
          <Link to="/add">
            <FiPlusCircle />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
