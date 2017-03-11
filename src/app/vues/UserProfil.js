import React from "react";

import Utility from './../utilities/utility.js';
import ProfilBox from './../components/ProfilBox.js'
import Header 	from "../components/Header.js";
import Footer 	from "../components/Footer.js";
import PostsContainer from './../components/PostsContainer.js'

export default class UserProfil extends React.Component {
    constructor(props){
    	super(props);

    	const defaultUser = {
			"id": 3,
			"rank": 2,
			"name": "test",
			"email": "quentin54.louis@laposte.net",
			"photo": "./../img/pp.jpg",
			"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam eos totam, delectus fuga minus dolorum labore, vitae quaerat ducimus, perferendis ipsam nisi sunt quis placeat magni obcaecati quasi distinctio quo.",
			"registerdate": "06 03 2017",
			"nbfollower": "46",
			"nbpost": "140",
			"posts": [1, 2, 3, 4, 5]
		};

	    this.state = {
	        user : defaultUser
	    };
    	this.loadData();
    }	

    callback(data){
    	this.setState({user:data})
    }

    loadData(){
        Utility.query("api/user/"+this.state.user.id+"/infos/", this.callback.bind(this));
    }

    render() {
        return(
            <div className="page">
        		<Header/>
        		<div id="profil">
	                <ProfilBox 
	                	id = {this.state.user.id}
	                	photo = {this.state.user.photo}
	                	name = {this.state.user.name}
	                	nbPost = {this.state.user.nbpost}
	                	nbFollower = {this.state.user.nbfollower}
	                	email = {this.state.user.email}
	                	desc = {this.state.user.description}
	                />
	                <PostsContainer posts={this.state.user.posts}/>
                </div>
            	<Footer/>
            </div>
        );
    }
}
