import React from "react";
const logoCross = require("./../../img/icons/cross.png");

export default class ReadMore extends React.Component{
	constructor (props) {
        super(props);

        this.state = { active: false };
        this.open = this.open.bind(this);
    }
    close () {
        this.setState({ active: false });
    }
    open () {
        this.setState({ active: true });
    }
	render(){
        var myStyle =   {
            display : (this.state.active)?"block":"none"
        };
		return(
			<div className ="read_more" style={myStyle}>
                <div className= "overlay"></div>
                <div className="aboutus">
                    <button onClick={this.close.bind(this)} className="close-button" >
                        <img src= {logoCross} width="30" height="30"/>
                    </button>
                    <h1>{this.props.title}</h1>
					<div className="challenge_box__desc">
						<h4>Description</h4>
						<p>{this.props.desc}</p>
					</div>
                </div>            
            </div>
		);
	}
}
