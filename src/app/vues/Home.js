import React 	from "react";
import Header 	from "../components/Header.js";
import Footer 	from "../components/Footer.js";
import PostsContainer from "../components/PostsContainer.js";
import ChallengeContainer from "../components/ChallengeContainer.js";
import UploadPost from "./../components/UploadPost.js";

export default class Home extends React.Component{
	constructor(props){
		super(props);
	}
	handleUploadBtnClick(){
		this.refs.upload.open();
	}
	
	render(){
		return(
			<div id="home" className="page"> 
		        <Header/>
		        <div className="challenge-carrousel">
			        <h1>Pick up your Challenge</h1>
			        <ChallengeContainer/>
		        </div>
		        
		        <button id="btn" onClick={this.handleUploadBtnClick.bind(this)}>>UPLOAD YOUR CONTENT</button>
				<UploadPost ref="upload"/>
				
	            <h1>Last Winners</h1>
	            <PostsContainer query={"api/winners/"}/>
		        <Footer/>
			</div>
		);
	}
}
