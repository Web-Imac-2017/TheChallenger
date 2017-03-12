import React from "react";

import Utility from "./../../utilities/utility.js"

export default class TabUser extends React.Component {
	
  handleDisconnect(){
    Utility.query('user/login');
  }

  render() {
    return(
      <div className="tab-user-menu" style={{display:"none"}}>		
				<button className="access-profil"> My Profil </button>
				<button className="disconnect" onClick={this.handleDisconnect.bind(this)}> Disconnect </button>
      </div>
    );
  }
	
	
}
