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
			<div id="home">
	        	<Header/>
				    <h1>HOME</h1>
            <PostsContainer />
	          <Footer/>
			</div>
		);
	}
}
