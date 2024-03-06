import React from 'react';
import { Link } from "react-router-dom";
import "./navbar.scss"

function NavBar() {
  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="brand">
          <h1>Simple Utak Test</h1>
        </Link>
        <Link to="/create">Create Menu</Link>
      </nav>
    </div>
  )
}

export default NavBar
