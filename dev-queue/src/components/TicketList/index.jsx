import React, { useEffect, useState } from 'react';
import { authenticatedAxios } from '../../utils/authenticAxios';
import Ticket from '../Ticket';

const TicketList = (props) => {
    const [tickets, setTickets] = useState();

    useEffect(() => {
        authenticatedAxios()
            .get('tickets')
            .then((res) => {
                setTickets(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2>All tickets: </h2>
                </div>
            </div>
            {tickets &&
                tickets.map((queue, key) => {
                    console.log(queue);
                    return <Ticket queue={queue} key={key} />;
                })}
        </div>
    );
};

export default TicketList;
