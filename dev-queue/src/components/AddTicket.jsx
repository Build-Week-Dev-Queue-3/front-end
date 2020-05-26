import React, { useEffect } from 'react';
import { authenticatedAxios } from '../utils/authenticAxios';
import { handleChange } from './Dashboard';
const AddTicket = (props) => {
    console.log('AddTicket Props: ', props);
    useEffect(() => {
        authenticatedAxios()
            .get('users')
            .then((res) => {
                console.log('users res', res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <section>
            <form>
                This is the add ticket
                <label>
                    Subject:
                    <input type="text" name="subject" onChange={handleChange} />
                </label>
                <label>
                    Ticket Description:
                    <input
                        type="text"
                        name="ticket_text"
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input />
                </label>
            </form>
        </section>
    );
};

export default AddTicket;
