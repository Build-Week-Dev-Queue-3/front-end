import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    return (
        <div className="App">
            <Login />
            <Register />
            <Dashboard />
        </div>
    );
}

export default App;
