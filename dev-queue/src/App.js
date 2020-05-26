import React from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';

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
                    <h1>Dashboard</h1>
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
