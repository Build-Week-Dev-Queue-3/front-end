import React, { useEffect, useState } from 'react';
import { authenticatedAxios } from '../utils/authenticAxios';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchData } from '../store/actions';

const AddTicket = (props) => {
    const initialState = { subject: '', ticket_text: '' };
    console.log('AddTicket Props: ', props);
    const [ticketData, setTicketData] = useState(initialState);
    const handleChange = (e) => {
        const newTicketData = {
            ...ticketData,
            [e.target.name]: e.target.value,
        };
        return setTicketData(newTicketData);
    };
    const { push } = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticatedAxios()
            .post('tickets', ticketData)
            .then((res) => {
                console.log(res);
                push('/');
                setTicketData(initialState);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    console.log(ticketData);
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
                        value={ticketData.subject}
                    />
                </label>
                <label>
                    Ticket Description:
                    <input
                        type="text"
                        name="ticket_text"
                        onChange={handleChange}
                        value={ticketData.ticket_text}
                    />
                </label>
                <button>Submit Ticket</button>
            </form>
        </section>
    );
};

const mapStateToProps = (state) => {
    // console.log('mSTP State: ', state);
    return {};
};

export default connect(null, { fetchData })(AddTicket);
