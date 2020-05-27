import React, { useEffect, useState } from 'react';
import { authenticatedAxios } from '../../utils/authenticAxios';
import { useHistory } from 'react-router-dom';
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
    const { push } = useHistory();
    return (
        <section>
            <h2>My Tickets will display here</h2>
            {myTickets && console.log(myTickets)}
            {myTickets &&
                myTickets.map((queue) => {
                    console.log(queue);
                    return (
                        <div
                            key={queue.id}
                            onClick={() => {
                                push('/userTicket'); //  CHECK URL WHEN THE TICKET PAGE GETS DONE //
                            }}
                        >
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
export default MyTickets;
