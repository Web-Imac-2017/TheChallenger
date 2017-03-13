import React from "react";
import Utility from "./../utilities/utility.js";

require('isomorphic-fetch');

export default class Login extends React.Component{
	constructor(props) {
	  super(props);

	  this.state = {
	  	url : './../../img/background2.jpg',
	  	artist: "Cheval253"
	  };

	
	}

	

// <div className="overlay ">
					// </div>
	render(){
	
        var divStyle = {
            backgroundImage: 'url(' + this.state.url + ')'
        }

		return(
			<div id="what-is-it">
				
				<div className="background_img " style={divStyle}>
					
					<div className="img " style={divStyle}>
					</div>
					
					
					
					<div className="title-presentation" > 
						THE CHALLENGER
					</div>
					
					<div className="text-question" > 
							<div className="borderBottom"> <i> 
								What is it ? </i>				
							</div>
					</div>
					
					<div className = "ligne-vertical">
					</div>
					
					<div className="text-presentation" > 
						It's a place where you can share any type of content 
						(text, video, pictures, gif, ... ) to challenge
						anyone and anywhere in the world
					</div>
					
				</div>
				
				<span className="artist"><p>by {this.state.artist}</p></span>
			
			</div>
		);
	}

}
