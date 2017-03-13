import React from "react";
import { BrowserRouter as Router,
         Link } from "react-router";
import ReactDom from "react-dom";

import Vignette from "./../assets/Vignette.js";
import TabUser from "./TabUser.js";

import Utility from "./../../utilities/utility.js"

const noImg = require('./../../../img/no-image.png');

export default class UserMenu extends React.Component {
	
	constructor (props){		
		super(props);
		
		this.state = {
			hover:false,
			user:{
				"id" : 2,
				"photo" : noImg
			}
		};	
		console.log("FETCH ID !!!!");
		Utility.query("api/user/id/", this.callbackIsConnected.bind(this))

		this.mouseOver = this.mouseOver.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
		
		this.openMenu = this.openMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
	}
		
	callbackUser(data){
		if(data === undefined )
			return;
		console.log("CALLBACK USER");
		console.log(data)
		this.setState({user:data});
	}

	callbackIsConnected(data){
		if(data === undefined )
			return;
		console.log("CALLBACK USER");
		console.log(data.id);
		/*if(!id)
			browserHistory.push('./Challenger/');*/
		Utility.query("api/user/show/"+data.id, this.callbackUser.bind(this));
	}

	mouseOver() {
        this.setState({hover: true});
		ReactDom.findDOMNode(this.refs.tabUser).style="display:block; " ;
    }
	
    mouseOut() {
        this.setState({hover: false});
		ReactDom.findDOMNode(this.refs.tabUser).style="display:none"
    }
	
	closeMenu() {
		 this.setState({hover: false});
		 ReactDom.findDOMNode(this.refs.tabUser).style="display:none"
	};
 
	
	openMenu() {
		this.setState({hover: true});
		ReactDom.findDOMNode(this.refs.tabUser).style="display:block; " ;
	};
	
   	render() {
        return(
            <div id="user-menu" className="user-menu" >
            	
				<div 	className="vignette" onClick={this.openMenu} 
						onMouseOver={this.mouseOver.bind(this)} 
						onMouseOut={this.mouseOut.bind(this)}>
						
					<Link to={"/profil/"+this.state.user.id}>
						<Vignette image ={this.state.user.photo}/> 
					</Link>
					<TabUser userId ={this.state.user.id} ref="tabUser" />  			
				</div>		
			</div>
					
		);
    }
}
