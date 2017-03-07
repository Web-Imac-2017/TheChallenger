import React from "react";
import Member from "./Member.js";

export default class AboutUs extends React.Component {
    render() {
    	return(
            <div className="aboutus">
                <h1>Our Team</h1>
                <p>- The Cap Squad -</p>
                <div className="membersList">
                	<Member image="../img/members/lisa.jpg" name="Lisa Couavoux" desc="Team Leader"/>
                    <Member image="../img/members/valentin.jpg" name="Valentin Bacon" desc="Graphist"/>
                    <Member image="../img/members/antoine.jpg" name="Antoine Demiere" desc="Front-end Developper"/>
                    <Member image="../img/members/mael.jpg" name="Maël Crespin-Pommier" desc="Front-end Developper"/>
                    <Member image="../img/members/laure.jpg" name="Laure Issa" desc="Back-end Developper"/>
                    <Member image="../img/members/quentin.jpg" name="Quentin Louis" desc="Back-end Developper"/>
                    <Member image="../img/members/marc.jpg" name="Marc Blactot" desc="Back-end Developper"/>
                    <Member image="../img/members/albert.jpg" name="Albert-Henri Moyrand" desc="Back-end Developper"/>
                </div>
               
            </div>
        );
    }
}
