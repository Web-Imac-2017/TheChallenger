import React from "react";
const twitter = require("./../../../img/icons/logo_twitter.png");

export default class Twitter extends React.Component {
    render() {
		
        return(
                <div className="item"> 
					<a href="http://www.twitter.com/" >
					<img src={twitter} height="20px" width="20px"/>
					</a>
				
                </div>
				
		
				
        );
    }
}
