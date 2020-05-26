import axios from 'axios';
export const FETCH_DATA_START = 'FETCH_DATA_START';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

// Initial fetch of data
export const fetchData = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_DATA_START });

        axios
            .get(``)
            .then((res) => {
                console.log('actions axios res: ', res);
                dispatch({
                    type: FETCH_DATA_SUCCESS,
                    payload: res.data,
                });
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: FETCH_DATA_FAILURE,
                    payload: err,
                });
            });
    };
};
