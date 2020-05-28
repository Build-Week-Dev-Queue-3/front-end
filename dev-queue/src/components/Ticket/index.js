import React, { useState } from 'react';
import './Ticket.css';
import { authenticatedAxios } from '../../utils/authenticAxios';
import { useHistory } from 'react-router-dom';

export default function Ticket(props) {
    const { id, subject, status, name, ticket_text, user_id } = props.queue;
    const you = JSON.parse(localStorage.getItem('you'));
    console.log('user id', user_id);
    console.log('your id', you.id);

    const [editing, setEditing] = useState(false);
    const [ticket, setTicket] = useState(props.queue);
    const [delMessage, setDelMessage] = useState('');
    const edit = (e) => {
        e.preventDefault();
        setEditing(!editing);
    };
    console.log(editing);

    const handleChanges = (e) => {
        e.persist();
        setTicket({
            ...ticket,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        authenticatedAxios()
            .put(`/tickets/:id/user/:uid`, ticket)
            .then((res) => {
                console.log(res);
                edit();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const { push } = useHistory();
    const deletePost = (e) => {
        e.preventDefault();
        authenticatedAxios()
            .delete(`/tickets/${id}/user/${you.id}`)
            .then((res) => {
                console.log(res);
                setDelMessage(res.data.message);
                props.getTickets();
                push('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };
    console.log(ticket);
    return (
        <div className="row ticket">
            <div className="col">
                <h2>{delMessage} </h2>
                <div className="row ticket__container">
                    <div className="col-lg-3 ticket__info">
                        <h5>Author:</h5>
                        <p>{name}</p>

                        <h5>Status:</h5>
                        <p className="ticket__status">{status}</p>
                    </div>
                    <div className="col ticket__content">
                        {editing ? (
                            <form onSubmit={handleSubmit}>
                                <h3>
                                    Subject:{' '}
                                    <input
                                        name="subject"
                                        value={subject}
                                        onChange={handleChanges}
                                    />
                                </h3>
                                <p>
                                    Description:{' '}
                                    <textarea
                                        name="ticket_text"
                                        value={ticket_text}
                                        onChange={handleChanges}
                                    />
                                </p>
                                <button>Submit</button>
                                <button>Cancel</button>
                            </form>
                        ) : (
                            <>
                                {' '}
                                <h3>{subject}</h3>
                                <p>{ticket_text}</p>
                            </>
                        )}
                        {you.id === user_id || !user_id
                            ? !editing && (
                                  <div className="ticket__actions">
                                      <a href="#" onClick={edit}>
                                          Edit
                                      </a>
                                      <a
                                          href="#"
                                          onClick={deletePost}
                                          className="text-danger"
                                      >
                                          Delete
                                      </a>
                                  </div>
                              )
                            : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
