import React from "react";
import LoginBox from "./../components/LoginBox.js"
import BackgroundImg from "./../components/BackgroundImg.js"

export default class Home extends React.Component{
	/*constructor(){
		this.setState({imgs : this.props.imgs})
	}

	componentDidMount(){
		setInterval(changeImgBG(), 10000);
	}*/

	changeImgBG(){

	}

	render(){
		//var imgUrl = this.state.nextImg ? this.state.nextImgSrc : this.state.song.imgSrc;
        var divStyle = {
            backgroundImage: 'url(' + this.props.url + ')',
            height: window.innerHeight
        }

		return(
			<div id="home" className="background_img span_12" style={divStyle}>
				<LoginBox/>
			</div>
		);
	}

}