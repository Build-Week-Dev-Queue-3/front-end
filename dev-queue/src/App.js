import React from 'react';
import './App.css';
import Dashboard from './components/dev/Dashboard';
import Login from './components/dev/Login';
import AddTicket from './components/AddTicket/AddTicket';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// import PrivateRoute from './utils/PrivateRoute';

import Header from './components/header';
import RegisterForm from './components/register';
import LoginForm from './components/login';

function App() {
    return (
        <>
            <Header />
            <Switch>
                // Dashboard
                <Route exact path="/">
                    <Dashboard />
                </Route>
                <Route path="/create">
                    <AddTicket />
                </Route>
                // Login page
                <Route path="/login">
                    <LoginForm />
                </Route>
                // Register page
                <Route path="/register">
                    <RegisterForm />
                </Route>
            </Switch>
        </>
    );
}

export default App;
