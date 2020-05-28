import React, { useState } from 'react';
import './Ticket.css';
import { authenticatedAxios } from '../../utils/authenticAxios';
import { useHistory } from 'react-router-dom';

export default function Ticket(props) {
    const { id, subject, status, name, ticket_text, user_id } = props.queue;
    const you = JSON.parse(localStorage.getItem('you'));
    // console.log('user id', user_id);
    // console.log('your id', you.id);
    const initialTicket = {
        subject: subject,
        ticket_text: ticket_text,
    };
    const [editing, setEditing] = useState(false);
    const [ticket, setTicket] = useState(initialTicket);
    const [delMessage, setDelMessage] = useState('');
    const edit = (e) => {
        e.preventDefault();
        setEditing(!editing);
        authenticatedAxios()
            .get('users')
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // console.log(editing);
    // console.log(props.queue);
    const handleChanges = (e) => {
        e.persist();
        setTicket({
            ...ticket,
            [e.target.name]: e.target.value,
            user_id: you.id,
        });
    };

    const handleEdit = (e) => {
        setEditing(!editing);
        e.preventDefault();
        authenticatedAxios()
            .put(`tickets/${id}/user/${you.id}`, ticket)
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
                // console.log(res);
                setDelMessage(res.data.message);
                props.getTickets();
                push('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };
    // console.log('ticket', ticket);

    const [currentStatus, setCurrentStatus] = useState(1);
    const handleStatus = (e) => {
        e.persist();
        setCurrentStatus({
            ...currentStatus,
            [e.target.name]: e.target.value,
        });
    };
    const changeStatus = (e) => {
        e.preventDefault();
        authenticatedAxios()
            .patch(`/tickets/${id}`, currentStatus)
            .then((res) => {
                // console.log(res);
                props.getTickets();
                setCurrentStatus({ status_id: '1' });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    console.log(ticket);
    console.log(status);
    return (
        <div className="row ticket">
            <div className="col">
                <h2>{delMessage} </h2>
                <div
                    className={
                        (status === 'submitted' &&
                            'row submitted ticket__container') ||
                        (status === 'in progress' &&
                            'row inProgress ticket__container') ||
                        (status === 'complete' &&
                            'row completed ticket__container') ||
                        (status === 'returned to queue' &&
                            'row returnedToQueue ticket__container')
                    }
                >
                    <div className="col-lg-3 ticket__info">
                        <h5>Author:</h5>
                        <p>{name}</p>

                        <h5>Status:</h5>
                        <p className="ticket__status">{status}</p>
                        {you.helper && (
                            <form>
                                <label htmlFor={'status_id'}>
                                    Set Status:{' '}
                                    <select
                                        name="status_id"
                                        onChange={handleStatus}
                                    >
                                        <option label="Select a status" />
                                        <option value={1} label="Submitted" />
                                        <option value={2}>In Progress</option>
                                        <option value={3}>
                                            Return to Queue
                                        </option>
                                        <option value={4}>Completed</option>
                                    </select>
                                </label>
                                <button onClick={changeStatus}>Submit</button>
                            </form>
                        )}
                    </div>
                    <div className="col ticket__content">
                        {editing ? (
                            <form>
                                <h3>
                                    Subject:{' '}
                                    <input
                                        name="subject"
                                        value={ticket.subject}
                                        onChange={handleChanges}
                                    />
                                </h3>
                                <p>
                                    Description:{' '}
                                    <textarea
                                        name="ticket_text"
                                        value={ticket.ticket_text}
                                        onChange={handleChanges}
                                    />
                                </p>
                                <button onClick={handleEdit}>Submit</button>
                                <button onClick={edit}>Cancel</button>
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
