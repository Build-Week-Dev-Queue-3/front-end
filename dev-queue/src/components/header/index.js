import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Header.css';
import { Button } from 'reactstrap';

export default function Header(props) {
    const { push } = useHistory();
    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('you');
        props.setLoggedIn(false);

        push('/');
    };
    return (
        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2">
                        <Link to="/" className="header__logo">
                            Home
                        </Link>
                    </div>
                    <div className="col-lg-10">
                        <nav className="header__nav">
                            {!props.loggedIn ? (
                                <Link
                                    className="header__nav-link header__nav-link--right"
                                    to="/login"
                                >
                                    Log In
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        className="header__nav-link"
                                        to="/all"
                                    >
                                        All Tickets
                                    </Link>
                                    <Link className="header__nav-link" to="/my">
                                        My Tickets
                                    </Link>
                                    <Link
                                        className="header__nav-link"
                                        to="/create"
                                    >
                                        Create
                                    </Link>
                                    <Button
                                        className="header__nav-link header__nav-link--right"
                                        onClick={logOut}
                                    >
                                        Log Out
                                    </Button>
                                </>
                            )}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
