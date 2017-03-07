import React from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";

export default class Home extends React.Component{
	constructor(props){
		super(props);
		this.state={
			url:""
		};
	}

/*	handleChangeURL(){

		this.setState({url : "http://localhost:8080/Challenger/Data/background.jpg"});
	}*/

	render(){
		return(
			<div id="home">
	            <Header/>
				<h1>HOME</h1>
	            <img src={this.state.url} width="150px" height="200px"/>
	            <Footer/>
			</div>
		);
	}
}
