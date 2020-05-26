import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { authenticatedAxios } from '../utils/authenticAxios';
import Axios from 'axios';

class Register extends React.Component {
    state = {
        creds: {
            name: '',
            email: '',
            cohort: '',
            password: '',
        },
    };

    handleChange = (e) => {
        this.setState({
            creds: {
                ...this.state.creds,
                [e.target.name]: e.target.value,
            },
        });
    };
    handleCheckBox = (e) => {
        this.setState({
            creds: {
                ...this.state.creds,
                [e.target.name]: !e.target.value,
            },
        });
    };
    handleRegister = (e) => {
        e.preventDefault();
        Axios.post(
            'https://bwdevdesk3.herokuapp.com/auth/register',
            this.state.creds
        )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    render() {
        console.log(this.state.creds);

        return (
            <section>
                <form onSubmit={this.handleRegister}>
                    <label>
                        Name:{' '}
                        <input
                            type="text"
                            name="name"
                            value={this.state.creds.name}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Email:{' '}
                        <input
                            type="text"
                            name="email"
                            value={this.state.creds.email}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Password:{' '}
                        <input
                            type="text"
                            name="password"
                            value={this.state.creds.password}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Cohort:{' '}
                        <input
                            type="text"
                            name="cohort"
                            value={this.state.creds.cohort}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Student
                        <input
                            type="checkbox"
                            name="student"
                            value={this.state.creds.student}
                            onChange={this.handleCheckBox}
                        />
                    </label>
                    <label>
                        Helper
                        <input
                            type="checkbox"
                            name="helper"
                            value={this.state.creds.helper}
                            onChange={this.handleCheckBox}
                        />
                    </label>
                    <button>Register</button>
                </form>
            </section>
        );
    }
}

export default Register;
