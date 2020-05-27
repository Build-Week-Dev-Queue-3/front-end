import React from 'react';
import { Button } from 'reactstrap';

const MyProfile = (props) => {
    const you = JSON.parse(localStorage.getItem('you'));

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2>My Profile</h2>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h3>{you.name}</h3>
                    <p>E-mail: {you.email}</p>
                    <p>Cohort: {you.cohort}</p>
                    <p>Status:
                            {you.student ? <li>Student</li> : null}
                            {you.helper ? <li>Helper</li> : null}
                    </p>
                    <Button className="btn btn-danger">Edit profile</Button>
                </div>
            </div>
        </div>
    );
};
export default MyProfile;
