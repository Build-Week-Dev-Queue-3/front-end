import React, { useEffect, useState } from 'react';
import { authenticatedAxios } from '../utils/authenticAxios';
import Axios from 'axios';
const AddTicket = (props) => {
    console.log('AddTicket Props: ', props);
    const [ticketData, setTicketData] = useState();
    const [tickets, setTickets] = useState([]);
    useEffect(() => {
        authenticatedAxios()
            .get('tickets')
            .then((res) => {
                console.log('tickets res', res);
                setTickets(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const handleChange = (e) => {
        const newTicketData = {
            ...ticketData,
            [e.target.name]: e.target.value,
        };
        return setTicketData(newTicketData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticatedAxios()
            .post('tickets', ticketData)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    console.log('tickets yoooo', tickets);
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <h2>Add a Ticket</h2>
                <label>
                    Subject:
                    <input
                        type="text"
                        name="subject"
                        onChange={handleChange}
                        value={props.subject}
                    />
                </label>
                <label>
                    Ticket Description:
                    <input
                        type="text"
                        name="ticket_text"
                        onChange={handleChange}
                        value={props.ticket_text}
                    />
                </label>
                <button>Submit Ticket</button>
            </form>
        </section>
    );
};

export default AddTicket;
