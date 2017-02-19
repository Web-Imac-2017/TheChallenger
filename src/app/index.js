require ('../css/style.scss');

import React from "react";
import ReactDOM from "react-dom";
import Home from "./vues/Home.js"

class Layout extends React.Component{
	render(){
		return(
			<Home/>
		);
	}
}

const app = document.getElementById('app');

ReactDOM.render(<Layout/>, app);