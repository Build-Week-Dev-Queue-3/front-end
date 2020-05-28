import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

import {
    Form,
    FormGroup,
    Input,
    Button,
    UncontrolledAlert,
} from 'reactstrap';
import commentFormSchema from './commentFormSchema';
import { authenticatedAxios } from '../../utils/authenticAxios';

export default function CommentForm(props) {
    const { ticketId } = props;

    const initialErrors = {comment: ''};
    const initialFormData = {comment: ''};

    let [errors, setErrors] = useState(initialErrors);
    let [formData, setFormData] = useState(initialFormData);
    let [disabled, setDisabled] = useState(true);

    

    function updateFormData(key, value) {
        setFormData({ ...formData, [key]: value });
    }

    function inputOnChangeHandler(event) {
        const element = event.target;

        updateFormData(element.name, element.value);

        yup.reach(commentFormSchema, element.name)
            .validate(formData[element.name])
            .then((valid) => {
                setErrors({ ...errors, [element.name]: '' });
            })
            .catch((err) => {
                setErrors({ ...errors, [element.name]: err.errors[0] });
            });
    }

    useEffect(() => {
        commentFormSchema.isValid(formData).then((valid) => {
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
            .post(`/tickets/${ticketId}/comments`, formData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => console.log(error));
    }

    return (
        <>
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
                    <Form autoComplete="off">
                        <h3>New Comment</h3>
                        <FormGroup>
                            <Input type="textarea" name="comment" onChange={inputOnChangeHandler} rows="5" />
                        </FormGroup>
                        
                        <FormGroup>
                            <Button disabled={disabled} onClick={onSubmitHandler} className="btn btn-danger">Post</Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </>
    );
}
