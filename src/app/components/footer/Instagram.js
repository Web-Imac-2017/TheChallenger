import React from "react";
const instagram = require("./../../../img/icons/logo_instagram.png");

export default class Instagram extends React.Component {
    render() {
		
        return(
                <div className="item"> 
					<a href="https://www.instagram.com/thechallengerimac/" >
					<img src={instagram} height="20px" width="20px"/>
					</a>
				
                </div>
				
		
				
        );
    }
}
