import React, {Component} from 'react';
import axios from "axios";

class Comment extends Component {
    state = {
        comments: [],
        id: ""
    };
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        let id = "";
        for (let param of query.entries()) {
            id = id + param[1];
        }

        const BASE_URL = "https://jsonplaceholder.typicode.com";
        axios.get(BASE_URL + "/comments")
            .then(response => response.data)
            .then(comments => {
                const commentsPerSelectedPostId = [];
                comments.map(item => {
                    if (item.postId === id) {
                        commentsPerSelectedPostId.push(item);
                    }
                });
                this.setState({comments: commentsPerSelectedPostId, id: id});
            })
    }

    render() {

        return (
            <div></div>  
        );
    }
}

export default Comment;