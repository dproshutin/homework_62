import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Blog from "./containers/Blog/Blog";
import './App.css';
import CharactersPage from "./containers/CharactersPage/CharactersPage";
import Main from "./containers/Main/Main";
import Comment from "./containers/Comment/Comment";

function App() {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/blogs" component={Blog}/>
                <Route path="/bloggers" component={CharactersPage}/>
                <Route path="/comments" component={Comment}/>
            </Switch>
        </BrowserRouter>

    );
}

export default App;
