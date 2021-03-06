import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';

import './Register.css';
import {
    Form,
    FormGroup,
    Input,
    Label,
    Button,
    UncontrolledAlert,
} from 'reactstrap';
import registerFormSchema from './registerFormSchema';

export default function RegisterForm(props) {
    const { push } = useHistory();
    const initialErrors = {
        name: '',
        email: '',
        password: '',
        cohort: '',
        helper: '',
        student: '',
    };

    const initialFormData = {
        name: '',
        email: '',
        password: '',
        cohort: '',
        helper: false,
        student: false,
    };

    const REGISTER_URL = 'https://bwdevdesk3.herokuapp.com/auth/register';

    let [errors, setErrors] = useState(initialErrors);
    let [formData, setFormData] = useState(initialFormData);
    let [disabled, setDisabled] = useState(true);

    function updateFormData(key, value) {
        setFormData({ ...formData, [key]: value });
    }

    function inputOnChangeHandler(event) {
        const element = event.target;

        if (element.getAttribute('type') === 'checkbox') {
            if (formData[element.name]) {
                updateFormData(element.name, false);
            } else {
                updateFormData(element.name, true);
            }
        } else {
            updateFormData(element.name, element.value);
        }

        yup.reach(registerFormSchema, element.name)
            .validate(formData[element.name])
            .then((valid) => {
                setErrors({ ...errors, [element.name]: '' });
            })
            .catch((err) => {
                setErrors({ ...errors, [element.name]: err.errors[0] });
            });
    }

    useEffect(() => {
        registerFormSchema.isValid(formData).then((valid) => {
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
            .post(REGISTER_URL, formData)
            .then((response) => {
                console.log(response);
                push('/login');
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className="register container">
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
                        <h2>New Account</h2>
                        <FormGroup>
                            <Label>Name:</Label>
                            <Input
                                type="text"
                                name="name"
                                onChange={inputOnChangeHandler}
                            />
                        </FormGroup>
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
                            <Label>Cohort:</Label>
                            <Input
                                type="text"
                                name="cohort"
                                onChange={inputOnChangeHandler}
                            />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input
                                    type="checkbox"
                                    id="helper"
                                    name="helper"
                                    onChange={inputOnChangeHandler}
                                />{' '}
                                Helper
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input
                                    type="checkbox"
                                    id="student"
                                    name="student"
                                    onChange={inputOnChangeHandler}
                                />{' '}
                                Student
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Button
                                disabled={disabled}
                                onClick={onSubmitHandler}
                                className="btn btn-danger"
                            >
                                Register
                            </Button>
                        </FormGroup>
                    </Form>
                    Already have an account? <Link to="/login">Log In</Link>
                </div>
            </div>
        </div>
    );
}
