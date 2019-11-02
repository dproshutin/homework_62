import React, {Component} from 'react';
import axios from "axios";
import './Blog.css';
import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";

class Blog extends Component {

    state = {
        posts: [],
        currentPostId: null,
        postsFormShown: false
    };

    _makeRequest = (url) => {
        return fetch(url).then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error("Something went wrong with network request!");
        });
    };

    componentDidMount() {
        const BASE_URL = "https://jsonplaceholder.typicode.com";

        axios.get(BASE_URL + "/posts?_limit=4").then(posts => {
            const promises = posts.data.map(post => {
                return axios.get(BASE_URL + "/users/" + post.userId)
                    .then(user => {
                        return {...post, author: user.data.name};
                    });
            });
            return Promise.all(promises);
        }).then(posts => {
            this.setState({posts});
        }).catch(err => {
            console.log(err);
        });
    }

    choosePostHandler = (id) => {
        this.setState({currentPostId: id});
    };

    togglePostsForm = () => {
        this.setState(prevState => {
            console.log("[Blog] Toggling Form");
            return {postsFormShown: !prevState.postsFormShown};
        });
    };

    render() {
        console.log("[Blog] render");

        let postsForm = null;

        if (!this.state.postsFormShown) {
            postsForm = (
                <form>
                    <p>Posts from will be here</p>
                </form>
            );
        }
        const posts = this.state.posts.map(post => (
            <Post
                title={post.title}
                author={post.author}
                key={post.id}
                clicked={() => this.choosePostHandler(post.id)}
            />
        ));
        return (
            <div>
                <section className="Posts">
                    {this.state.postsFormShown ? posts : null}
                </section>

                <button onClick={this.togglePostsForm}>Toggle Form</button>
                <FullPost
                    postId={this.state.currentPostId}
                    history={this.props.history}
                />
                {postsForm}
            </div>
        );
    }
}

export default Blog;