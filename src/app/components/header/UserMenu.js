import React from "react";
import ReactDom from "react-dom";
import Vignette from "./Vignette.js";
import TabUser from "./TabUser.js";

export default class UserMenu extends React.Component {
	
	constructor (props){		
		super(props);
		
		
		this.state = {hover:false};	
	
		
		
		this.mouseOver = this.mouseOver.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
		
		
	
		this.openMenu = this.openMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		}
		
	mouseOver = () => {
        this.setState({hover: true});
		ReactDom.findDOMNode(this.refs.tabUser).style="display:block; " ;
    }
	
    mouseOut() {
        this.setState({hover: false});
		ReactDom.findDOMNode(this.refs.tabUser).style="display:none"
    }	
	
	
	closeMenu () {
		 this.setState({hover: false});
		 ReactDom.findDOMNode(this.refs.tabUser).style="display:none"
	};
 
	
	openMenu () {
		this.setState({hover: true});
		
		ReactDom.findDOMNode(this.refs.tabUser).style="display:block; " ;
	};
	
	
   render() {
        return(
                <div className="user-menu" >
					<div className="vignette" onClick={this.openMenu} onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)}  >
				
					
							<Vignette image ={"img/no-image.png"}/> 
							<TabUser ref="tabUser" />  
					    							
					</div>	
				
					
					
				</div>
					
		);
    }
}
