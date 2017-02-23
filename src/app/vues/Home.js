import React from "react";
import LoginBox from "./../components/LoginBox.js"

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
            backgroundImage: 'url(' + this.props.url + ')'
        }

		return(
			<div id="home">
				<div className="background_img blur" style={divStyle}></div>
				<div className="overlay"></div>
				<LoginBox/>
			</div>
		);
	}

}