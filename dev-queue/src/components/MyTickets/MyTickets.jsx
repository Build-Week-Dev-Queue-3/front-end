import React, { useEffect, useState } from 'react';
import { authenticatedAxios } from '../../utils/authenticAxios';
import { connect } from 'react-redux';
import { fetchData } from '../../store/actions';

import Ticket from '../Ticket';

const userId = localStorage.getItem('userId');

// console.log(userId);

const MyTickets = (props) => {
    const [myTickets, setMyTickets] = useState();
    console.log(props);
    useEffect(() => {
        authenticatedAxios()
            .get(`tickets/users/${userId}`)
            .then((res) => {
                setMyTickets(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    console.log('myTickets', myTickets);
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2>My tickets: </h2>
                </div>
            </div>
            {myTickets &&
                myTickets.map((queue, key) => (
                    <Ticket queue={queue} key={key} />
                ))}
        </div>
    );
};
const mapStateToProps = (state) => {
    console.log('DisplayedData mSTP: ', state);
    return {
        isFetching: state.dataFetchReducer.isFetching,
        error: state.dataFetchReducer.error,
        dataArray: state.dataFetchReducer.dataArray,
    };
};
export default connect(mapStateToProps, { fetchData })(MyTickets);
