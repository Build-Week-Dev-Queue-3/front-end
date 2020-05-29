import React, { useEffect, useState } from 'react';
import { authenticatedAxios } from '../../utils/authenticAxios';
import { connect } from 'react-redux';
import { fetchData } from '../../store/actions';

import Ticket from '../Ticket';

const userId = localStorage.getItem('userId');

// console.log(userId);

const MyTickets = (props) => {
    console.log('props', props);
    // useEffect(() => {
    //     authenticatedAxios()
    //         .get(`tickets/users/${userId}`)
    //         .then((res) => {
    //             setMyTickets(res.data.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);
    useEffect(() => {
        props.fetchData(`tickets`);
    }, []);

    console.log('myTickets', props.dataArray);
    console.log(userId);
    {
        props.dataArray &&
            props.dataArray.data.map((value) => {
                if (userId == value.user_id) {
                    console.log('yooo', value);
                }
            });
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2>My tickets: </h2>
                </div>
            </div>
            {props.dataArray &&
                props.dataArray.data.map((queue, key) => {
                    if (userId == queue.user_id) {
                        return (
                            <Ticket
                                queue={queue}
                                key={key}
                                getTickets={(e) => {
                                    props.fetchData('tickets');
                                }}
                            />
                        );
                    }
                })}
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
