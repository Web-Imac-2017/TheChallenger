import React from "react";
import ChallengeMin from './ChallengeMin.js'
import Utility from './../utilities/utility.js';

export default class ChallengeContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            challengesIds: [1,2,3,4],
            challenges : this.props.challenges, 
        };

        if(this.props.query !== null){
            Utility.query(this.props.query, this.callBackData.bind(this));
            console.log("challenges REQUETES ENVOYEE");
            // remplissage par défaut
            this.state = {
                challenges: this.state.challengesIds.map(()=>{    
                    return(<ChallengeMin challengeId={1} />);
                })
            };
        }
    }

    callBackData(data) {
        console.log("CALLBACK CHALLENGE CONTAINER")
        console.log(data);
        this.setState({
            challengesIds: data,
            challenges: data == null ? null : data.map((id) => {return(<ChallengeMin challengeId={1} />);})
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
