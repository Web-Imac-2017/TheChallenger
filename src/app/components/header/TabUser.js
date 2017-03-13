import React from "react";
import { BrowserRouter as Router,
         Link } from "react-router";

import Utility from "./../../utilities/utility.js"

export default class TabUser extends React.Component {
	
  handleDisconnect(){
    Utility.query('api/user/logout/');
  }

  render() {
    return(
      <div className="tab-user-menu" style={{display:"none"}}>		
				<button className="access-profil">Profil </button>
				<button className="disconnect" onClick={this.handleDisconnect.bind(this)}> Disconnect </button>
      </div>
    );
  }
	
	
}
