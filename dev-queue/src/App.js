import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/dev/Dashboard';
import AddTicket from './components/AddTicket/AddTicket';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import PrivateRoute from './utils/PrivateRouter';

import Header from './components/header';
import RegisterForm from './components/register';
import LoginForm from './components/login';
import MyTickets from './components/MyTickets/MyTickets';

function App() {
    const token = localStorage.getItem('token');

    const [loggedIn, setLoggedIn] = useState(token && true);

    return (
        <>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <Switch>
                // Dashboard
                <PrivateRoute exact path="/" component={Dashboard} />
                {/* <Dashboard />
                </PrivateRoute> */}
                <PrivateRoute path="/create" component={AddTicket} />
                {/* <AddTicket />
                </PrivateRoute> */}
                // Login page
                <Route path="/login">
                    <LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                </Route>
                // Register page
                <Route path="/register">
                    <RegisterForm />
                </Route>
                <PrivateRoute path="/all" component={Dashboard} />
                <PrivateRoute path="/my" component={MyTickets} />
            </Switch>
        </>
    );
}

export default App;
