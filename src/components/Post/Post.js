import React, {Component} from 'react';
import './Post.css'

class Post extends Component {
    componentDidMount() {
        console.log("[Post] didMount");
    }

    shouldComponentUpdate(nextProps) {
        console.log("[Post] ShouldUpdate");
        return nextProps.title !== this.props.title || nextProps.author
            !== this.props.author;
    }

    componentDidUpdate() {
        console.log("[Post] DidUpdate");
    }

    render() {
        console.log("[Post] render");
        return (
            <article className="Post">
                <h2 onClick={this.props.clicked}>{this.props.title}</h2>
                <div className="Info">
                    <div className="Author">{this.props.author}</div>
                </div>
            </article>
        );
    }
}

export default Post;