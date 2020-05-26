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
                    <div className="col-lg-10">
                        <nav className="header__nav">
                            <Link className="header__nav-link" to="/all">All Tickets</Link>
                            <Link className="header__nav-link" to="/my">My Tickets</Link>
                            <Link className="header__nav-link" to="/create">Create</Link>
                            <Link className="header__nav-link header__nav-link--right" to="/login">Log In</Link>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}