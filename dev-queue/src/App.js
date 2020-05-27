import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/AddTicket/dev/Login';
import AddTicket from './components/AddTicket/AddTicket';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// import PrivateRoute from './utils/PrivateRoute';

function App() {
    return (
        <Router>
            <div className="App">
                <Login />
                {/* <Register /> */}
                <br />
                <AddTicket />
                <br />
                <Dashboard />
            </div>
        </Router>
    );
}

export default App;
