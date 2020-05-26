import React from 'react';
import { authenticatedAxios } from '../utils/authenticAxios';
import Axios from 'axios';

class Login extends React.Component {
    state = {
        creds: {
            email: '',
            password: '',
        },
    };

    handleChanges = (e) => {
        this.setState({
            creds: {
                ...this.state.creds,
                [e.target.name]: e.target.value,
            },
        });
    };

    login = (e) => {
        e.preventDefault();
        Axios.post(
            'https://bwdevdesk3.herokuapp.com/auth/login',
            this.state.creds
        )
            .then((res) => {
                // this.props.history.push('/protected');
                console.log(res);
                localStorage.setItem('token', res.data.token);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route
    render() {
        return (
            <>
                <h4>Login required to continue:</h4>
                <form onSubmit={this.login}>
                    email:
                    <input
                        type="text"
                        name="email"
                        value={this.state.creds.email}
                        onChange={this.handleChanges}
                    />
                    <br />
                    Password:
                    <input
                        type="text"
                        name="password"
                        value={this.state.creds.password}
                        onChange={this.handleChanges}
                    />
                    <br />
                    <button>Login</button>
                </form>
            </>
        );
    }
}

export default Login;
