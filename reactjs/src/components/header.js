import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'; 

function Header() {
    return (
        <header className="navbar">
            <nav>
                <ul className="nav-links">
                    <li>
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li>
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
