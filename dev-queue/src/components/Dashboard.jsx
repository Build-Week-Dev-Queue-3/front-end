import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../store/actions';

const Dashboard = (props) => {
    console.log(props.apiData);

    useEffect(() => {
        props.fetchData('');
    }, []);
    return (
        <section>
            <h2>this is the dashboard as of now.</h2>
            <h3>Getting a response from the backend server.</h3>
            {!props.fetchData.api && <h3>{props.fetchData.api} </h3>}
        </section>
    );
};
const mapStateToProps = (state) => {
    console.log('mSTP State: ', state);
    return {
        apiData: state.dataFetchReducer.dataArray,
    };
};

export default connect(mapStateToProps, { fetchData })(Dashboard);
