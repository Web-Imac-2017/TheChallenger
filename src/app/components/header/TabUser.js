import React from "react";

import Utility from "./../../utilities/utility.js"

export default class TabUser extends React.Component {
	

  render() {
    //<button className="access-profil">Profil </button>
    return(
      <div className="tab-user-menu" style={{display:"none"}}>		
				<a className="disconnect" href='api/user/logout/'> Disconnect </a>
      </div>
    );
  }
	
	
}
