import React, { useState } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import * as yup from 'yup';
import './App.css';

import Header from './components/header';
import RegisterForm from './components/register';


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
                    Login
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
