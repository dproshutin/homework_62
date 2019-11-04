import React, {Component} from 'react';
import axios from "axios";
import './Comment.css';

class Comment extends Component {

    state = {
        comments: [],
        id: ""
    };

    _getComments = () => {
        const id = this.props.match.params.id;
        const BASE_URL = "https://jsonplaceholder.typicode.com";
        axios.get(BASE_URL + "/comments")
            .then(response => response.data)
            .then(comments => {
                const commentsPerSelectedPostId = [];
                comments.map(item => {
                    if (item.postId === parseInt(id) && id !== undefined) {
                        commentsPerSelectedPostId.push(item);
                    } else if (id === undefined) {
                        commentsPerSelectedPostId.push(item);
                    }
                    return item;
                });
                this.setState({comments: commentsPerSelectedPostId});
            })
    };

    componentDidMount() {
        this._getComments();
    }

    _shouldRequest = () => {
        return (this.props.postId !== this.state.id);
    };

    componentDidUpdate(prevProps, prevState) {
        if (this._shouldRequest()) {
            this._getComments();
        }
    }

    render() {
        const title = (this.props.match.params.id !== undefined) ? <h2>Comments for Post #{this.props.match.params.id}</h2> :
            <h2>All comments</h2>;
        const comments = this.state.comments.map(comment => {
            return (
                <div
                    key={comment.id}
                    className="Comment"
                >
                    <div className="Clearfix">
                        <p className="Email">{comment.email} says:</p>
                    </div>
                    <p className="Message">{comment.body}</p>
                </div>
            );
        });
        return (
            <div>
                {title}
                {comments}
            </div>
        );
    }
}

export default Comment;