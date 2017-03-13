import React from "react";

import Utility from "./../../utilities/utility.js"

export default class TabUser extends React.Component {
	
  handleDisconnect(){
    Utility.query('api/user/logout/');
  }

  render() {
    //<button className="access-profil">Profil </button>
    return(
      <div className="tab-user-menu" style={{display:"none"}}>		
				<button className="disconnect" onClick={this.handleDisconnect.bind(this)}> Disconnect </button>
      </div>
    );
  }
	
	
}
