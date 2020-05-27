import React, { useEffect, useState } from 'react';
import { authenticatedAxios } from '../../utils/authenticAxios';
import { useHistory } from 'react-router-dom';
import Ticket from '../Ticket';

const userId = localStorage.getItem('userId');

// console.log(userId);

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
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2>My tickets: </h2>
                </div>
            </div>
            {myTickets && myTickets.map((queue, key) => <Ticket queue={queue} key={key} />)}
        </div>
    );
};
export default MyTickets;
