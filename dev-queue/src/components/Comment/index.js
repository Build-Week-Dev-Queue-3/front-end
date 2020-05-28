import React from 'react';
import './Comment.css';
import { authenticatedAxios } from '../../utils/authenticAxios';
import Axios from 'axios';

export default function Comment(props) {
    const { comment, name } = props.commentData;
    const ticket = props.ticket;
    const loadTicket = props.loadTicket;

    const you = JSON.parse(localStorage.getItem('you'));

    function isMyComment() {
        if (props.commentData.name === you.name) {
            return true;
        } else {
            return false;
        }
    }
    console.log('ticket(this is the whole page)', ticket);
    console.log('comment data', props.commentData);

    function deleteCommentHandler(event) {
        event.preventDefault();

        authenticatedAxios()
            .delete(
                `/tickets/${props.commentData.ticket_id}/comments/${props.commentData.id}`
            )
            .then((res) => {
                console.log(res);
                loadTicket();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="row comment">
            <div className="col comment__container">
                <h4>{name}</h4>
                <p>{comment}</p>
                {isMyComment() && (
                    <p>
                        <a
                            href="#"
                            className="text-danger"
                            onClick={deleteCommentHandler}
                        >
                            Delete
                        </a>
                    </p>
                )}
            </div>
        </div>
    );
}
