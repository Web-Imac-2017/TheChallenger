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
            "photo" : "./../../../img/challenges/pandaRoux.jpg",
            "title" : "Panda",
            "description" : "Les pandas sont de super animaux, mais connaissez-vous les pandas roux? Vous avez 4h.LOL"
		};

	    this.state = {
	        challenge : null
	    };
    	this.loadData();
    }	

    callbackData(data){
        /*console.log("CHALLENGE")
        console.log(data)
        console.log(data.timeleft)
        console.log(Date(data.timeleft))*/
    	this.setState({challenge:data})
    }

    loadData(){
        Utility.query("api/challenge/show/"+this.props.params.challengeId, this.callbackData.bind(this));
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
    	                	time = {this.state.challenge.timeleft}/> 

                  <button id="btn post-min" className="tag-btn" onClick={this.handleUploadBtnClick.bind(this)}>UPLOAD YOUR CONTENT</button>
                  <UploadPost ref="upload" challengeId={this.state.challenge.id}/>
                  <PostsContainer query={"api/challenge/posts/"}/>
                </div>
            	<Footer/>
            </div>
        );
    }
}
