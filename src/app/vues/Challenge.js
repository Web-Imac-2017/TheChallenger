import React from "react";
import Utility from './../utilities/utility.js';
import Header 	from "../components/Header.js";
import Footer 	from "../components/Footer.js";
import PostsContainer from './../components/PostsContainer.js';
import ChallengeBox from './../components/ChallengeBox.js';
import UploadPost from "./../components/UploadPost.js";


export default class Challenge extends React.Component {
    constructor(props){
    	super(props);

    	const defaultChallenge = {
			"id" : 1,
            "photo" : "./../../../img/challenges/panda.jpg",
            "title" : "panda",
            "description" : "Les pandas sont de super animaux, mais connaissez-vous les pandas roux? Vous avez 4h.LOL"
		};

	    this.state = {
	        challenge : defaultChallenge
	    };
    	this.loadData();
    }	

    callback(data){
    	this.setState({challenge:data})
    }

    loadData(){
        Utility.query("api/challenge/show/"+this.state.challenge.id, this.callback.bind(this));
    }
	timeLeft(){
        Utility.query("api/challenge/timeleft/"+this.state.id, this.callback.bind(this));
    }
    handleUploadBtnClick(){
        this.refs.upload.open();
    }
    
    render() {
    	if(this.state.challenge === null)
            return null;
        return(
            <div className="page">
        		<Header/>
        		<div id="challenge_page">
	                <ChallengeBox 
	                	id = {this.state.challenge.id}
	                	photo = {this.state.challenge.photo}
	                	title = {this.state.challenge.title}
	                	time = {this.timeLeft()}/> 

                    <div className="posts-container">
                        <button id="btn post-min" className="tag-btn" onClick={this.handleUploadBtnClick.bind(this)}>UPLOAD YOUR CONTENT</button>
                        <UploadPost ref="upload"/>
                        <PostsContainer/>
                   
                     </div> 
                </div>
            	<Footer/>
            </div>
        );
    }
}
