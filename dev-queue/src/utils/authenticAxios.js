import axios from 'axios';

export const authenticatedAxios = () => {
    const token = localStorage.getItem('token');
    return axios.create({
        headers: {
            Authorization: token,
        },
        baseURL: '',
    });
};
