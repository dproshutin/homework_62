import React, {Component} from 'react';
import './Post.css'

class Post extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.title !== this.props.title || nextProps.author
            !== this.props.author;
    }

    render() {
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