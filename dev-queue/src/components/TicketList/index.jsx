import React, { useEffect, useState } from 'react';
import { authenticatedAxios } from '../../utils/authenticAxios';
import Ticket from '../Ticket';
import { connect } from 'react-redux';
import { fetchData, getTickets } from '../../store/actions';

const TicketList = (props) => {
    console.log('ticketlist props: ', props);
    useEffect(() => {
        props.fetchData('tickets');
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2>All tickets: </h2>
                </div>
            </div>
            {!props.dataArray && <h2>Loading Please Wait...</h2>}
            {props.dataArray &&
                props.dataArray.data.map((queue, key) => {
                    // console.log(queue);
                    return (
                        <Ticket
                            queue={queue}
                            getTickets={() => {
                                props.fetchData('tickets');
                            }}
                            key={key}
                        />
                    );
                })}
        </div>
    );
};
const mapStateToProps = (state) => {
    console.log('TicketList mSTP: ', state);
    return {
        isFetching: state.dataFetchReducer.isFetching,
        error: state.dataFetchReducer.error,
        dataArray: state.dataFetchReducer.dataArray,
    };
};

export default connect(mapStateToProps, { fetchData })(TicketList);
