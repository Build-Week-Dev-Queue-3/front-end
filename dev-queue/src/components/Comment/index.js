import React from 'react';
import './Comment.css';
import { authenticatedAxios } from '../../utils/authenticAxios';

export default function Comment (props) {
    const { comment, name } = props.commentData;
    const ticket = props.ticket;
    const loadTicket = props.loadTicket;

    const you = JSON.parse(localStorage.getItem('you'));

    function isMyComment () {
        if (props.commentData.name === you.name) {
            return true;
        } else {
            return false;
        }
    }

    function deleteCommentHandler (event) {

        event.preventDefault();

        authenticatedAxios()
            .delete(`/tickets/${ticket.id}/comments/${props.commentData.id}`)
            .then((response) => {
                console.log(response);
                loadTicket();
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className="row comment">
            <div className="col comment__container">
                <h4>{ name }</h4>
                <p>{ comment }</p>
                {isMyComment() &&
                    <p>
                        <a href="#" className="text-danger" onClick={deleteCommentHandler}>Delete</a>
                    </p>
                }
            </div>
        </div>
    );
}