import React from 'react';
import './Ticket.css';

export default function Ticket(props) {
    const { id, subject, status, name, ticket_text, user_id } = props.queue;
    const you = JSON.parse(localStorage.getItem('you'));
    console.log('user id', user_id);
    console.log('your id', you.id);

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

                        {you.helper || you.id === user_id ? (
                            <div className="ticket__actions">
                                <a href="#">Edit</a>
                                <a href="#" className="text-danger">
                                    Delete
                                </a>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
