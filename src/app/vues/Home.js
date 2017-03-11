import React 	from "react";
import Header 	from "../components/Header.js";
import Footer 	from "../components/Footer.js";
import PostsContainer from "../components/PostsContainer.js";

export default class Home extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div id="home" className="page"> 
		        <Header/>
	            <h1>Last Winners</h1>
	            <PostsContainer query={"api/winners/"}/>
		        <Footer/>
			</div>
		);
	}
}
