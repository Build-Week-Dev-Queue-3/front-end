import React, { useState, useEffect } from 'react';
import { authenticatedAxios } from '../../utils/authenticAxios';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchData } from '../../store/actions';
import addTicketSchema from './addTicketSchema';
import {
    Form,
    FormGroup,
    Input,
    Label,
    Button,
    UncontrolledAlert,
} from 'reactstrap';
import * as yup from 'yup';

const AddTicket = (props) => {
    const initialFormData = { subject: '', ticket_text: '' };
    const initialErrors = { subject: '', ticket_text: '' };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState(initialErrors);
    const [disabled, setDisabled] = useState(true);
    
    const { push } = useHistory();


    function updateFormData(key, value) {
        setFormData({ ...formData, [key]: value});
    }

    function inputOnChangeHandler(event) {
        const element = event.target;

        updateFormData(element.name, element.value);

        yup.reach(addTicketSchema, element.name)
            .validate(formData[element.name])
            .then((valid) => {
                setErrors({ ...errors, [element.name]: '' });
            })
            .catch((err) => {
                setErrors({ ...errors, [element.name]: err.errors[0] });
            });
    }

    useEffect(() => {
        addTicketSchema.isValid(formData).then((valid) => {
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

        authenticatedAxios()
            .post('tickets', formData)
            .then((res) => {
                push('/');
                setFormData(initialFormData);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="container">

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
                <div className="col">
                    <h2>Create a Ticket</h2>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6">
                    <Form autoComplete="off">
                        <FormGroup>
                            <Label>Subject:</Label>
                            <Input type="text" name="subject" onChange={inputOnChangeHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Please describe the issue:</Label>
                            <Input type="textarea" name="ticket_text" onChange={inputOnChangeHandler} rows="10" />
                        </FormGroup>
                        <FormGroup>
                            <Button className="btn btn-danger" disabled={disabled} onClick={onSubmitHandler}>Done</Button>
                        </FormGroup>
                    </Form>

                </div>
            </div>
        </div>
    );
};

export default connect(null, { fetchData })(AddTicket);
