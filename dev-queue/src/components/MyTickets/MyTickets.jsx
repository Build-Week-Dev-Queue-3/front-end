import React, { useEffect, useState } from 'react';
import { authenticatedAxios } from '../../utils/authenticAxios';
const userId = localStorage.getItem('userId');
console.log(userId);
const MyTickets = () => {
    const [myTickets, setMyTickets] = useState();
    useEffect(() => {
        authenticatedAxios()
            .get(`tickets/users/${userId}`)
            .then((res) => {
                console.log(res);
                setMyTickets(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <section>
            <h2>My Tickets will display here</h2>
            {MyTickets && console.log(myTickets)}
        </section>
    );
};
export default MyTickets;
