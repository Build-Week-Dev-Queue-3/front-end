import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../store/actions';

const Dashboard = (props) => {
    // console.log('props', props);
    useEffect(() => {
        props.fetchData('tickets');
    }, []);
    return (
        <section>
            <h2>this is the dashboard as of now.</h2>
            {props.data &&
                props.data.map((queue) => {
                    console.log(queue);
                    return (
                        <div key={queue.id}>
                            <h3>{queue.subject}</h3>
                            <h6>Status {queue.status}</h6>
                            <p>Submited by: {queue.name}</p>
                            <h4>Description: </h4>
                            <p>{queue.ticket_text}</p>
                        </div>
                    );
                })}
        </section>
    );
};
const mapStateToProps = (state) => {
    // console.log('mSTP State: ', state);
    return {
        error: state.dataFetchReducer.error,
        isFetching: state.dataFetchReducer.isFetching,
        data: state.dataFetchReducer.dataArray.data,
    };
};

export default connect(mapStateToProps, { fetchData })(Dashboard);
