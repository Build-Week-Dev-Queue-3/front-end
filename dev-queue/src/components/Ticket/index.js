import React from 'react';
import './Ticket.css';

export default function Ticket (props) {
    const {id, subject, status, name, ticket_text} = props.queue;

    return (
        <div className="row ticket">
            <div className="col">
                <div className="row ticket__container">
                    <div className="col-lg-3 ticket__info">
                        <h5>Author:</h5>
                        <p>{name}</p>

                        <h5>Status:</h5>
                        <p className="ticket__status">{status}</p>
                    </div>
                    <div className="col ticket__content">
                        <h3>{subject}</h3>
                        <p>{ticket_text}</p>
                        <div className="ticket__actions">
                            <a href="#">Action</a>
                            <a href="#" className="text-danger">Action</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}