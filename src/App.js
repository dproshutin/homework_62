import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {NavLink} from "react-router-dom";
import Blog from "./containers/Blog/Blog";
import './App.css';
import CharactersPage from "./containers/CharactersPage/CharactersPage";
import Main from "./containers/Main/Main";
import Comment from "./containers/Comment/Comment";

function App() {

    return (
        <div className="App">
            <div className="AppNavLinksWrapper">
                <NavLink to="/" className="AppLink" activeStyle={{border: "1px solid red"}} exact>Home</NavLink>
                <NavLink to="/blogs" className="AppLink" exact>Blogs</NavLink>
                <NavLink to="/bloggers" className="AppLink" exact>Bloggers</NavLink>
                <NavLink to="/comments" className="AppLink">Comments</NavLink>
            </div>

            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/blogs" component={Blog}/>
                <Route path="/bloggers" component={CharactersPage}/>
                <Route path="/comments" exact component={Comment}/>
                <Route path="/comments/postId:id" component={Comment}/>
            </Switch>
        </div>
    );
}

export default App;
