import React, { useState } from 'react';
import './App.css';
import AddTicket from './components/AddTicket/AddTicket';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import PrivateRoute from './utils/PrivateRouter';

import Header from './components/header';
import RegisterForm from './components/register';
import LoginForm from './components/login';
import MyTickets from './components/MyTickets/MyTickets';
import TicketList from './components/TicketList';
import MyProfile from './components/MyProfile';
import TicketDetails from './components/TicketDetails';

function App() {
    const token = localStorage.getItem('token');
    const [loggedIn, setLoggedIn] = useState(token && true);
    document.title = 'Dev-Desk-Queue';
    return (
        <>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <Switch>
                // Dashboard
                <PrivateRoute exact path="/" component={TicketList} />
                // Add Ticket
                <PrivateRoute path="/create" component={AddTicket} />
                <PrivateRoute exact path="/tickets" component={TicketList} />
                // Ticket details
                <PrivateRoute path="/tickets/:id" component={TicketDetails} />
                // Login page
                <Route path="/login">
                    <LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                </Route>
                // Register page
                <Route path="/register" component={RegisterForm} />
                // User tickets
                <PrivateRoute path="/my" component={MyTickets} />
                // Personal profile page
                <PrivateRoute path="/profile" component={MyProfile} />
                // Routes to login everytime
                <Route component={LoginForm} />
            </Switch>
        </>
    );
}

export default App;
