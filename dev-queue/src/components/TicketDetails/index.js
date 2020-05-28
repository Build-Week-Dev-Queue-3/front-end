import React, { useEffect, useState } from 'react';
import ticketDetailsSchema from './ticketDetailsSchema';
import Ticket from '../Ticket';
import { useParams } from 'react-router-dom';
import { authenticatedAxios } from '../../utils/authenticAxios';
import CommentForm from '../CommentForm'
import Comment from '../Comment'
import './TicketDetails.css';

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

    function loadTicket () {
        authenticatedAxios()
            .get(`tickets/${ticketId}`)
            .then((res) => {
                setCurrentTicket(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        loadTicket();
    }, []);


    return (
        <div className="container">
            {currentTicket &&
                <Ticket queue={currentTicket} />
            }
            <div className="comments">
                <div className="row">
                    <div className="col">
                        <h2>Comments</h2>
                    </div>
                </div>
                {currentTicket && currentTicket.comments.map((commentData, key) => {
                    return <Comment commentData={commentData} ticket={currentTicket} loadTicket={loadTicket} key="key" />
                })}
            </div>

            <CommentForm ticketId={ticketId} loadTicket={loadTicket} />
        </div>
    );
}