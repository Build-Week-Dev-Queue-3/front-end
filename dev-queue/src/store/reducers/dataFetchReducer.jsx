import {
    FETCH_DATA_START,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
} from '../actions';

const initialState = {
    isFetching: false,
    error: '',
    dataArray: '',
};

export const dataFetchReducer = (state = initialState, action) => {
    switch (action.type) {
        // For data fetch failure
        case FETCH_DATA_FAILURE:
            return {
                ...state,
                error: action.payload,
                isFetching: false,
            };
        // When data fetch is successful
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                error: '',
                isFetching: false,
                dataArray: action.payload,
            };
        // When data fetch is started
        case FETCH_DATA_START:
            return {
                ...state,
                isFetching: true,
                error: '',
                dataArray: action.payload,
            };

        default:
            return state;
    }
};
