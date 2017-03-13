import React from "react";
import Utility from './../utilities/utility.js';
import Header 	from "../components/Header.js";
import Footer 	from "../components/Footer.js";
import PostsContainer from './../components/PostsContainer.js';
import ChallengeBox from './../components/ChallengeBox.js';

export default class UserProfil extends React.Component {
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
    render() {
    	if(this.state.challenge === null)
            return null;
        return(
            <div className="page">
        		<Header/>
        		<div id="challenge">
	                <ChallengeBox 
	                	id = {this.state.challenge.id}
	                	photo = {this.state.challenge.photo}
	                	title = {this.state.challenge.title}
	                	time = {this.timeLeft()}/> 
                </div>
            	<Footer/>
            </div>
        );
    }
}
