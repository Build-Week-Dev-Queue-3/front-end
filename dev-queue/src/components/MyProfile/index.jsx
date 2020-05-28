import React, { useState } from 'react';
import { authenticatedAxios } from '../../utils/authenticAxios';
import { Button } from 'reactstrap';

const MyProfile = (props) => {
    console.log('these are your props: ', props.you);
    const you = JSON.parse(localStorage.getItem('you'));
    const [profile, setProfile] = useState(you);
    const [editing, setEditing] = useState(false);

    const editProfile = () => {
        setEditing(!editing);
        setProfile({
            ...profile,
            password: '',
        });
    };
    console.log(profile);

    const handleChanges = (e) => {
        e.persist();
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        authenticatedAxios()
            .put(`users/${profile.id}`, profile)
            .then((res) => {
                console.log('axios put :', res);
                setEditing(!editing);
                setProfile(res.data.user);
                localStorage.removeItem('you');
                localStorage.setItem('you', JSON.stringify(res.data.user));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    console.log(editing);

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2>My Profile</h2>
                    <hr />
                </div>
            </div>
            {!editing ? (
                <div className="row">
                    <div className="col">
                        <h3>{profile.name}</h3>
                        <p>E-mail: {profile.email}</p>
                        <p>Cohort: {profile.cohort}</p>
                        <p>
                            Status:
                            {profile.student ? <li>Student</li> : null}
                            {profile.helper ? <li>Helper</li> : null}
                        </p>
                        <Button
                            className="btn btn-danger"
                            onClick={editProfile}
                        >
                            Edit profile
                        </Button>
                    </div>
                </div>
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
                            name="email"
                            type="text"
                            value={profile.email}
                            onChange={handleChanges}
                        />
                    </label>{' '}
                    <label>
                        Password:{' '}
                        <input
                            name="password"
                            type="password"
                            value={profile.password}
                            onChange={handleChanges}
                        />
                    </label>{' '}
                    <button onClick={editing}>Cancel</button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();

                            handleSubmit();
                        }}
                    >
                        Submit
                    </button>
                </form>
            )}{' '}
        </div>
    );
};
export default MyProfile;
