import React, { useEffect, useState } from 'react';
import { authenticatedAxios } from '../../utils/authenticAxios';

const Dashboard = (props) => {
    console.log('props', props);
    const [tickets, setTickets] = useState();
    useEffect(() => {
        authenticatedAxios()
            .get('tickets')
            .then((res) => {
                console.log(res);
                setTickets(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <section>
            <h2>All open tickets: </h2>
            {tickets &&
                tickets.data.map((queue) => {
                    console.log(queue);
                    return (
                        <div key={queue.id}>
                            <h3>{queue.subject}</h3>
                            <h6>Status {queue.status}</h6>
                            <p>Submited by: {queue.name}</p>
                            <h4>Description: </h4>
                            <p>{queue.ticket_text}</p>
                        </div>
                    );
                })}
        </section>
    );
};

export default Dashboard;
