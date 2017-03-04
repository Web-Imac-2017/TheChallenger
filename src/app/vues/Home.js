import React 	from "react";
import Header 	from "../components/Header.js";
import Footer 	from "../components/Footer.js";
import PostMin 	from "../components/PostMin.js"

export default class Home extends React.Component{
	render(){
		return(
			<div id="home">
	            <Header/>
				<h1>HOME</h1>
				<PostMin postId="1"/>
	            <Footer/>
			</div>
		);
	}
}
