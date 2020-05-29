import React, { useEffect, useState } from 'react';
import { authenticatedAxios } from '../../utils/authenticAxios';
import Ticket from '../Ticket';

const TicketList = (props) => {
    const [tickets, setTickets] = useState();
    const getTickets = () => {
        authenticatedAxios()
            .get('tickets')
            .then((res) => {
                setTickets(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getTickets();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2>All tickets: </h2>
                </div>
            </div>
            {!tickets && <h2>Loading Please Wait...</h2>}
            {tickets &&
                tickets.map((queue, key) => {
                    // console.log(queue);
                    return (
                        <Ticket
                            queue={queue}
                            getTickets={getTickets}
                            key={key}
                        />
                    );
                })}
        </div>
    );
};

export default TicketList;
