import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Header.css";

export default function Header(props) {
  const { push } = useHistory();
  const logOut = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("you");
    props.setLoggedIn(false);

    push("/");
  };
  console.log(window.location.href);
  if (
    window.location.href == "http://localhost:3000/login" ||
    "https://dev-queue.perezented.now.sh/login"
  ) {
    localStorage.removeItem("token");
  }
  window.onclose = closingCode;
  if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  } else {
    localStorage.removeItem("token");
  }
  function closingCode() {
    return null;
  }
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
                  <Link className="header__nav-link" to="/">
                    All Tickets
                  </Link>
                  <Link className="header__nav-link" to="/my">
                    My Tickets
                  </Link>
                  <Link className="header__nav-link" to="/profile">
                    My Profile
                  </Link>
                  <Link className="header__nav-link" to="/create">
                    Create a Ticket
                  </Link>
                  <a
                    href="#"
                    className="header__nav-link header__nav-link--right"
                    onClick={logOut}
                  >
                    Log Out
                  </a>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
