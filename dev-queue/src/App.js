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
import RealDashboard from './components/dev/RealDashboard';

function App() {
    const token = localStorage.getItem('token');
    const [loggedIn, setLoggedIn] = useState(token && true);
    const you = localStorage.getItem('you');

    return (
        <>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <Switch>
                // Dashboard
                <PrivateRoute exact path="/" component={RealDashboard} />
                // Add Ticket
                <PrivateRoute path="/create" component={AddTicket} />
                // Login page
                <Route path="/login">
                    <LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                </Route>
                // Register page
                <Route path="/register" component={RegisterForm} />
                <PrivateRoute path="/all" component={Dashboard} />
                <PrivateRoute path="/my" component={MyTickets} />
            </Switch>
        </>
    );
}

export default App;
