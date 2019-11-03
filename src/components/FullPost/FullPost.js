import React, {Component} from 'react';
import axios from "axios";
import Button from "../UI/Button/Button";

class FullPost extends Component {
    state = {
        post: null
    };

    _shouldRequest = () => {
        return this.props.postId && (!this.state.post || this.props.postId !== this.state.post.id);
    };

    getCommentsHandler = (id) => {
        this.props.history.push({
            pathname: '/comments/postId' + id,
        });
    };

    componentDidUpdate(prevProps, prevState) {
        const BASE_URL = "https://jsonplaceholder.typicode.com";
        if (this._shouldRequest()) {
            axios.get(BASE_URL + "/posts/" + this.props.postId).then(post => {
                this.setState({post: post.data});
            });
        }
    }

    render() {
        if (!this.state.post) {
            return <div>No posts selected</div>;
        }
        return (
            <div className="FullPost">
                <h1>{this.state.post.title}</h1>
                <p>{this.state.post.body}</p>
                <Button
                    btnType={"get_quote"}
                    click={() => this.getCommentsHandler(this.props.postId)}
                    value={"Comments for this post"}
                />
            </div>
        );
    }
}

export default FullPost;