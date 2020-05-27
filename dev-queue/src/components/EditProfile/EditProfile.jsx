import React from 'react';

const EditProfile = (props) => {
    console.log('these are your props: ', props.you);
    return (
        <section>
            <h3>Welcome to your profile!</h3>
            <ul>
                <li>Name: {props.you.name} </li>
                <li>Email: {props.you.email}</li>
                <li>Cohort: {props.you.cohort} </li>
                {props.you.student ? <li>Student</li> : null}
                {props.you.helper ? <li>helper</li> : null}
            </ul>
            <button>Edit your profile</button>
        </section>
    );
};
export default EditProfile;
