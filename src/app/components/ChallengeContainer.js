import React from "react";
import ChallengeMin from './ChallengeMin.js'
import Utility from './../utilities/utility.js';

export default class ChallengeContainer extends React.Component{
    constructor(props){
        super(props);
        const defaultState={
            challengesIds: [1,2,3,4],
            challenges : this.props.challenges
        };

        this.state = {
            challengesIds: null,
            challenges : null
        };
        
        Utility.query("api/challenge/current/", this.callBackData.bind(this));
    }

    callBackData(data) {
        console.log("CALLBACK CHALLENGE CONTAINER")
        console.log(data);
        this.setState({
            challengesIds: data,
            challenges: data == null ? null : data.map((id) => {return(<ChallengeMin key={id} id={id} />);})
        });
    }
    render(){
	    return(
            <div className="challenge-container">
                {this.state.challenges}
            </div>
	    );
	}
}
