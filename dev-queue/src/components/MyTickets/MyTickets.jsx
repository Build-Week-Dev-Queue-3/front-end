import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../../store/actions';

import Ticket from '../Ticket';

const userId = localStorage.getItem('userId');

const MyTickets = (props) => {
    useEffect(() => {
        props.fetchData(`tickets`);
    }, []);

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
            {!props.dataArray && <h2>Loading Please Wait...</h2>}
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
    console.log('MyTickets mSTP: ', state);
    return {
        isFetching: state.dataFetchReducer.isFetching,
        error: state.dataFetchReducer.error,
        dataArray: state.dataFetchReducer.dataArray,
    };
};
export default connect(mapStateToProps, { fetchData })(MyTickets);
