import React from "react";
import { BrowserRouter as Router,
         Link } from "react-router";


		 
export default class Vignette extends React.Component {
	
	
	
    render() {
        return(
			<div className="circle-back">
				<img 	src={this.props.image}  
						alt="vignette" 
						className="img-profil" 
						width="47px" 
						height="47px" />				
			</div>
        );
    }
}