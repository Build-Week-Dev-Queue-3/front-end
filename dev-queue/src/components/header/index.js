import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';

export default function Header(props) {
    return (
        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2">
                        <Link to="/" className="header__logo">Home</Link>
                    </div>
                    <div className="col">
                        <nav className="header__nav">
                            <Link className="header__nav-link" to="/login">Log In</Link>
                            <Link className="header__nav-link" to="/register">Register</Link>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}