import React from 'react';
import './Comment.css';

export default function Comment (props) {
    const { comment, name } = props.commentData;
    return (
        <div className="row comment">
            <div className="col comment__container">
                <h4>{ name }</h4>
                <p>{ comment }</p>
            </div>
        </div>
    );
}