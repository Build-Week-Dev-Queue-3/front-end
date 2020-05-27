import { LOGGING_OUT, LOGGING_IN } from '../actions';
const loggedIn = {
    loggedIn: false,
};

export const loggedInReducer = (state = loggedIn, action) => {
    switch (action.type) {
        case LOGGING_IN:
            return {
                ...state,
                loggedIn: true,
            };
        case LOGGING_OUT:
            return {
                ...state,
                loggedIn: false,
            };
        default:
            return state;
    }
};
