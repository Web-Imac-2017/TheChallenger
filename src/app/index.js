require ('../css/style.scss');

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory } from 'react-router';
import Login from "./vues/Login.js";
import Home from "./vues/Home.js";
import AboutUs from "./vues/AboutUs.js";

const app = document.getElementById('app');

class Layout extends React.Component{
	render(){
		return(
			<Router history={hashHistory}>
			    <Route path="/" component={Login}/>
			    <Route path="/about" component={AboutUs}/>
			    <Route path="/home" component={Home}/>
			</Router>	
		);
	}
}

ReactDOM.render(<Layout/>, app);
