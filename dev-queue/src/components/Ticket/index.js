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
    const [editMessage, setEditMessage] = useState('');

    const edit = (e) => {
        {
            !editing && e.preventDefault();
        }
        setEditing(!editing);
    };

    console.log(props);
    const handleChanges = (e) => {
        e.persist();
        setTicket({
            ...ticket,
            [e.target.name]: e.target.value,
            user_id: you.id,
        });
    };

    const handleEdit = (e) => {
        e.preventDefault();
        setEditing(!editing);
        props.getTickets();
        authenticatedAxios()
            .put(`tickets/${id}/user/${you.id}`, ticket)
            .then((res) => {
                console.log(res);
                {
                    res.data.ticket && setTicket(res.data.ticket);
                }
                setEditing(!editing);
                setEditMessage(res.data.message);
                setTimeout(() => {
                    setEditMessage('');
                }, 3500);
                setTicket(initialTicket);
                props.getTickets();
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
                setTimeout(() => {
                    setDelMessage('');
                }, 3500);
                props.getTickets();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [currentStatus, setCurrentStatus] = useState(1);
    const handleStatus = (e) => {
        e.persist();
        setCurrentStatus({
            ...currentStatus,
            [e.target.name]: e.target.value,
        });
    };
    const submitStatusChange = (e) => {
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
                        {you.helper && you.id !== user_id && (
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
                                <button onClick={submitStatusChange}>
                                    Submit
                                </button>
                            </form>
                        )}
                        {id && (
                            <div className="ticket__actions">
                                <a
                                    href=""
                                    onClick={() => {
                                        push(`/tickets/${id}`);
                                    }}
                                >
                                    View more info
                                </a>
                            </div>
                        )}{' '}
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
                                {editMessage}
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
