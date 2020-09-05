import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';

import './Login.css';
import {
    Form,
    FormGroup,
    Input,
    Label,
    Button,
    UncontrolledAlert,
} from 'reactstrap';
import loginFormSchema from './loginFormSchema';

export default function LoginForm(props) {
    const initialErrors = {
        email: '',
        password: '',
    };

    const initialFormData = {
        email: '',
        password: '',
    };

    const LOGIN_URL = 'https://bwdevdesk3.herokuapp.com/auth/login';

    const { push } = useHistory();

    let [errors, setErrors] = useState(initialErrors);
    let [formData, setFormData] = useState(initialFormData);
    let [disabled, setDisabled] = useState(true);

    function updateFormData(key, value) {
        setFormData({ ...formData, [key]: value });
    }

    function inputOnChangeHandler(event) {
        const element = event.target;

        updateFormData(element.name, element.value);

        yup.reach(loginFormSchema, element.name)
            .validate(formData[element.name])
            .then((valid) => {
                setErrors({ ...errors, [element.name]: '' });
            })
            .catch((err) => {
                setErrors({ ...errors, [element.name]: err.errors[0] });
            });
    }

    useEffect(() => {
        loginFormSchema.isValid(formData).then((valid) => {
            if (valid) {
                setDisabled(false);
                setErrors(initialErrors);
            } else {
                setDisabled(true);
            }
        });
    }, [formData]);

    function onSubmitHandler(event) {
        event.preventDefault();

        axios
            .post(LOGIN_URL, formData)
            .then((response) => {
                push('/');
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.user.id);
                localStorage.setItem('you', JSON.stringify(response.data.user));
                props.setLoggedIn(true);
                push('/');
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className="login container">
            {Object.keys(errors).map((item, key) => {
                if (errors[item]) {
                    return (
                        <div className="row" key={key}>
                            <div className="col">
                                <UncontrolledAlert color="danger">
                                    {errors[item]}
                                </UncontrolledAlert>
                            </div>
                        </div>
                    );
                }
            })}
            <div className="row">
                <div className="col-lg-6">
                    <Form autoComplete="off">
                        <h2>Log In</h2>
                        <FormGroup>
                            <Label>E-mail:</Label>
                            <Input
                                type="email"
                                name="email"
                                onChange={inputOnChangeHandler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Password:</Label>
                            <Input
                                type="password"
                                name="password"
                                onChange={inputOnChangeHandler}
                            />
                        </FormGroup>
                        <FormGroup>
                            {props.loggedIn ? (
                                <Button
                                    onClick={() => {
                                        props.setLoggedIn(false);
                                        localStorage.removeItem('token');
                                    }}
                                >
                                    Log Out
                                </Button>
                            ) : (
                                <Button
                                    disabled={disabled}
                                    onClick={onSubmitHandler}
                                    className="btn btn-danger"
                                >
                                    Log In
                                </Button>
                            )}
                        </FormGroup>
                    </Form>
                    Don't have an account? <Link to="/register">Register</Link>
                </div>
            </div>
        </div>
    );
}
