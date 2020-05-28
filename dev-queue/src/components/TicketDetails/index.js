import React, { useEffect, useState } from 'react';
import ticketDetailsSchema from './ticketDetailsSchema';
import Ticket from '../Ticket';
import { useParams } from 'react-router-dom';
import { authenticatedAxios } from '../../utils/authenticAxios';

import {
    Form,
    FormGroup,
    Input,
    Button,
    UncontrolledAlert,
} from 'reactstrap';

export default function TicketDetails (props) {
    const params = useParams();
    const ticketId = params.id;

    const [currentTicket, setCurrentTicket] = useState();

    useEffect(() => {
        authenticatedAxios()
            .get(`tickets/${ticketId}`)
            .then((res) => {
                setCurrentTicket(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    return (
        <div className="container">
            {currentTicket &&
                <Ticket queue={currentTicket} />
            }
        </div>
    );
}