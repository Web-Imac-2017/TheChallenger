import React from "react";
import Vignette from './assets/Vignette.js'

export default class Challenge extends React.Component{
    render(){
        //PANDA: Recupérer le nom du challenge
	    return(
            <div className="challenge-container">

                <button /*onClick={}*/ >
                    <Vignette image="./../img/challenges/panda.jpg"/*{this.props.photo}*//>
                    <h4 className="challengeTitle">Panda</h4> 
                    <p>Challenge</p>
                </button>
            </div>
	    );
	}
}
