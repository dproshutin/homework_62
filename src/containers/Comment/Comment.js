import React, {Component} from 'react';
import axios from "axios";
import './Comment.css';

class Comment extends Component {

    state = {
        comments: [],
        id: ""
    };

    componentDidMount() {
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
                    return 1;
                });
                this.setState({comments: commentsPerSelectedPostId});
            })
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