require ('../sass/main.scss');


import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory } from 'react-router';
//import BackgroundImage from 'react-background-image-loader';

import utility 	from './utilities/utility.js';
import Login 	from "./vues/Login.js";
import Home 	from "./vues/Home.js";
import AboutUs 	from "./vues/AboutUs.js";
import Contact 	from "./vues/Contact.js";
import UserProfil from "./vues/UserProfil.js";
import Post from "./vues/Post.js";

const app = document.getElementById('app');

class Layout extends React.Component{
	render(){
		return(
			<Router history={hashHistory}>
			      <Route path="/" component={Login}/>
			      <Route path="home" component={Home}/>
				    <Route path="contact" component={Contact}/>
				    <Route path="about" component={AboutUs}/>
				    <Route path="profil/(:userId)" name="/profil" component={UserProfil}/>
            <Route path="post/(:postId)" component={Post} />
			</Router>	
		);
	}
}

ReactDOM.render(<Layout/>, app);
