import React from "react";
const facebook = require("./../../../img/icons/logo_facebook.png");

export default class Facebook extends React.Component {
    render() {
        return(
	        <div className="item" >
				<a href="https://www.facebook.com/TheChallenger-feat-Julien-766136173563028/?fref=ts" >
					<img src={facebook} height="20px" width="20px"/>
				</a>
            </div>
				
		
				
        );
    }
}
