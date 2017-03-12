import React from "react";
import Vignette from './assets/Vignette.js'
import Utility from './../utilities/utility.js';
import { BrowserRouter as Router,
         Link } from "react-router";

export default class ChallengeMin extends React.Component{
    constructor(props){
        super(props);
        const defaultChallenge ={
            "id" : 1,
            "photo" : "./../../../img/challenges/panda.jpg",
            "title" : "panda"
        };
        this.state = {
            challenge : defaultChallenge
        };
        this.loadData();
    }

    loadData(){
        var challengeId = this.props.challengeId;
        Utility.query('api/challenge/current/'+challengeId, this.callback.bind(this));   
    }

    callback(data){
        this.setState({ challenge : data });
    }
    render(){
        if(this.state.challenge === null)
            return null;
	    return(
            <div className="challenge-min">
                <Link to={"/challenge/"+this.state.challenge.id}>
                    <Vignette image={this.state.challenge.photo}/>
                    <h4>{this.state.challenge.title}</h4> 
                    <p>Challenge</p>
                </Link>
            </div>
	    );
	}
}
