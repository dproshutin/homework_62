import React, {Component} from 'react';
import Button from "../../components/UI/Button/Button";

class Main extends Component {
    blogsShowHandler = () => {
        this.props.history.push({
            pathname: '/blogs'
        });
    };
    bloggersShowHandler = () => {
        this.props.history.push({
            pathname: '/bloggers'
        });
    };
    render() {
        return (
            <div>
                <Button
                    btnType={"get_quote"}
                    click={this.blogsShowHandler}
                    history={this.props.history}
                    value={"Blogs"}
                />
                <Button
                    btnType={"get_quote"}
                    click={this.bloggersShowHandler}
                    value={"Bloggers"}
                />
            </div>
        );
    }
}

export default Main;