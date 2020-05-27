import React, { useState } from 'react';

const EditProfile = (props) => {
    console.log('these are your props: ', props.you);
    const [editing, setEditing] = useState(false);
    const [profile, setProfile] = useState(props.you);
    const editProfile = () => {
        setEditing(!editing);
    };
    console.log(profile);
    return (
        <section>
            <h3>Welcome to your profile!</h3>
            {!editing ? (
                <>
                    <ul>
                        <li>Name: {props.you.name} </li>
                        <li>Email: {props.you.email}</li>
                        <li>Cohort: {props.you.cohort} </li>
                        <br />
                        <h6>You are a: </h6>
                        {props.you.student ? <li>Student</li> : null}
                        {props.you.helper ? <li>helper</li> : null}
                    </ul>
                    <button onClick={editProfile}>Edit your profile</button>
                </>
            ) : (
                <form>
                    <label>
                        Name:{' '}
                        <input name="name" type="text" value={profile.name} />
                    </label>{' '}
                    <label>
                        Email:{' '}
                        <input name="name" type="text" value={profile.email} />
                    </label>{' '}
                    <button onClick={editProfile}>Cancel</button>
                    <button>Submit</button>
                </form>
            )}{' '}
        </section>
    );
};
export default EditProfile;
