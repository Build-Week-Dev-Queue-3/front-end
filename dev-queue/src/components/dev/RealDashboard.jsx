import React from 'react';
import Dashboard from './Dashboard';
import EditProfile from '../EditProfile/EditProfile';

const RealDashboard = () => {
    const you = JSON.parse(localStorage.getItem('you'));

    console.log('you : ', you);
    return (
        <section>
            <h2>This is the Real Dashboard</h2>
            <h3>Welcome to your dashboard {you.name}!</h3>
            <div>
                <EditProfile you={you} />
            </div>
            <div>
                <br />
                <Dashboard />
            </div>
        </section>
    );
};
export default RealDashboard;
