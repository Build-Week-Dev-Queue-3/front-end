import React, { useState } from 'react';
import { authenticatedAxios } from '../../utils/authenticAxios';

const EditProfile = (props) => {
    console.log('these are your props: ', props.you);
    const you = localStorage.getItem('you');
    const [editing, setEditing] = useState(false);
    const [profile, setProfile] = useState(you);
    const editProfile = () => {
        setEditing(!editing);
    };
    console.log(profile);

    const handleChanges = (e) => {
        e.persist();
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticatedAxios()
            .put(`users/${profile.id}`, profile)
            .then((res) => {
                console.log('axios put :', res);
                setEditing(!editing);
                setProfile(res.data.user);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    console.log(editing);
    return (
        <section>
            <h3>Welcome to your profile!</h3>
            {!editing ? (
                <>
                    <ul>
                        <li>Name: {profile.name} </li>
                        <li>Email: {profile.email}</li>
                        <li>Cohort: {profile.cohort} </li>
                        <br />
                        <h6>You are a: </h6>
                        {profile.student ? <li>Student</li> : null}
                        {profile.helper ? <li>Helper</li> : null}
                    </ul>
                    <button onClick={editProfile}>Edit your profile</button>
                </>
            ) : (
                <form>
                    <label>
                        Name:{' '}
                        <input
                            name="name"
                            type="text"
                            value={profile.name}
                            onChange={handleChanges}
                        />
                    </label>{' '}
                    <label>
                        Email:{' '}
                        <input
                            name="name"
                            type="text"
                            value={profile.email}
                            onChange={handleChanges}
                        />
                    </label>{' '}
                    <button onClick={editProfile}>Cancel</button>
                    <button onClick={handleSubmit}>Submit</button>
                </form>
            )}{' '}
        </section>
    );
};
export default EditProfile;
