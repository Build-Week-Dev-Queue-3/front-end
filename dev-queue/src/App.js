import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import AddTicket from './components/AddTicket';

function App() {
    return (
        <div className="App">
            <Login />
            {/* <Register /> */}
            <br />
            <AddTicket />
            <br />
            <Dashboard />
        </div>
    );
}

export default App;
