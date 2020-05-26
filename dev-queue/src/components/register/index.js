import React from 'react';
import './Register.css';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

export default function RegisterForm(props) {
    return (
        <>
            <div className="register container">
                <div className="row">
                    <div className="col-lg-6">
                        <Form>
                            <h2>New Account</h2>
                            <FormGroup>
                                <Label>Name:</Label>
                                <Input type="text" name="name" />
                            </FormGroup>
                            <FormGroup>
                                <Label>E-mail:</Label>
                                <Input type="email" name="email" />
                            </FormGroup>
                            <FormGroup>
                                <Label>Password:</Label>
                                <Input type="password" name="password" />
                            </FormGroup>
                            <FormGroup>
                                <Label>Cohort:</Label>
                                <Input type="text" name="cohort" />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" id="helper" />{' '}
                                    Helper
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" id="student" />{' '}
                                    Student
                                </Label>
                            </FormGroup>
                            <FormGroup>
                                <Button className="btn btn-danger btn-lg">Register</Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}