import React from 'react';
import TicketList from './index';
import EditProfile from '../MyProfile';

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
                <TicketList />
            </div>
        </section>
    );
};
export default RealDashboard;
