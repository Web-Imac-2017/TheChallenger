require ('../sass/main.scss');

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory } from 'react-router';

import Login from "./vues/Login.js";
import Home from "./vues/Home.js";
import Contact from "./vues/Contact.js";
import UserProfil from "./vues/UserProfil.js";
import Challenge from "./vues/Challenge.js";
import SearchVue from "./vues/Search.js";

const app = document.getElementById('app');

class Layout extends React.Component{
    render(){
        return(
            <Router history={hashHistory}>
                <Route path="/" component={Login}/>
                <Route path="/home" component={Home}/>
                <Route path="profil/:userId" name="/profil" component={UserProfil}/>
                <Route path="challenge/:challengeId" name="/challenge" component={Challenge}/>
                <Route path="search/:searchString" component={SearchVue} name="/search" />
            </Router>
        );
    }
}

ReactDOM.render(<Layout/>, app);
