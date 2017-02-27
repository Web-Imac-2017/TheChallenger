import React from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";

export default class Home extends React.Component{
	render(){
		return(
			<div id="home">
            <Header/>
				    <h1>HOME</h1>
            <Footer/>
			</div>
		);
	}
}
