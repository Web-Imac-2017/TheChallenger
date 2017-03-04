require ('../css/main.scss');

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory } from 'react-router';

import utility 	from './utilities/utility.js';
import Login 	from "./vues/Login.js";
import Home 	from "./vues/Home.js";
import AboutUs 	from "./vues/AboutUs.js";
import Contact 	from "./vues/Contact.js";

const app = document.getElementById('app');

class Layout extends React.Component{
	render(){
		return(
			<Router history={hashHistory}>
			    <Route path="/" component={Login}/>
			    <Route path="/home" component={Home}/>
				<Route path="/contact" component={Contact}/>
				<Route path="/about" component={AboutUs}/>
			</Router>	
		);
	}
}

ReactDOM.render(<Layout/>, app);
