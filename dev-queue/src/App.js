import React from 'react';
import './App.css';
import Dashboard from './components/dev/Dashboard';
import AddTicket from './components/AddTicket/AddTicket';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import PrivateRoute from './utils/PrivateRouter';

import Header from './components/header';
import RegisterForm from './components/register';
import LoginForm from './components/login';

function App() {
    return (
        <>
            <Header />
            <Switch>
                // Dashboard
                <PrivateRoute exact path="/">
                    <Dashboard />
                </PrivateRoute>
                <PrivateRoute path="/create">
                    <AddTicket />
                </PrivateRoute>
                // Login page
                <Route path="/login">
                    <LoginForm />
                </Route>
                // Register page
                <Route path="/register">
                    <RegisterForm />
                </Route>
                <Route path="/all" component={Dashboard} />
            </Switch>
        </>
    );
}

export default App;
