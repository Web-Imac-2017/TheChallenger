import React from "react";
import Vignette from './assets/Vignette.js'
import Utility from './../utilities/utility.js';
import { BrowserRouter as Router,
         Link } from "react-router";

export default class ChallengeMin extends React.Component{
    constructor(props){
        super(props);

        const defaultChallenge = {
            "id" : 1,
            "photo" : "./../../../img/challenges/panda.jpg",
            "title" : "Panda"
        };

        this.state = {
            challenge : null
        };
        this.loadData();
    }

    loadData(){
        var id = this.props.id;
        Utility.query('api/challenge/show/'+id, this.callback.bind(this));   
    }

    callback(data){
        this.setState({ challenge : data });
    }
    
    render(){
        if(this.state.challenge === null)
            return null;
	    return(
            <div className="challenge-min" id={this.state.challenge.id}>
                <Link to={"/challenge/"+this.state.challenge.id}>
                    <Vignette image={Utility.getPublicPath()+this.state.challenge.photo} overlay={true}/>
                    <div className="challenge_min__title">
                        <h4>{this.state.challenge.title}</h4> 
                        <h4>Challenge</h4>
                    </div>
                </Link>
            </div>
	    );
	}
}
