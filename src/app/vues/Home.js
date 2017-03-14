import React 	from "react";
import { BrowserRouter as Router,
         Link, IndexRedirect,  browserHistory } from "react-router";

import Header 	from "../components/Header.js";
import Footer 	from "../components/Footer.js";
import PostsContainer from "../components/PostsContainer.js";
import ChallengeContainer from "../components/ChallengeContainer.js";

export default class Home extends React.Component{
	constructor(props){
		super(props);
		
		//this.props.history.replaceState(null, "/");j
	}

	componentWillReceiveProps(nextProps) {
	    this.setState({
	        children: nextProps.children
	    });
	}

	handleClick(){
		browserHistory.push("/");
		//this.componentWillReceiveProps()
	}

	render(){		
		return(
			<div id="home" className="page"> 
		        <Header/>
		        <div className="challenge-carrousel">
			        <h1>Pick up your Challenge</h1>
			        <ChallengeContainer/>
		        </div>
	            <h1 onClick={this.handleClick.bind(this)}>Last Winners</h1>
	            <PostsContainer query={"api/winners/"}/>
		        <Footer/>
			</div>
		);
	}
}
