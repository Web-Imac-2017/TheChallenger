import React from "react";
import Member from "./Member.js";

const logoCross = require("./../../../img/icons/cross.png");
const lisa = require("./../../../img/members/lisa.jpg");
const valentin = require("./../../../img/members/valentin.jpg");
const antoine = require("./../../../img/members/antoine.jpg");
const mael = require("./../../../img/members/mael.jpg");
const laure = require("./../../../img/members/laure.jpg");
const quentin = require("./../../../img/members/quentin.jpg");
const marc = require("./../../../img/members/marc.jpg");
const albert = require("./../../../img/members/albert.jpg");

export default class AboutUs extends React.Component {
    constructor (props) {
        super(props);

        this.state = { active: false };
        this.open = this.open.bind(this);
    }
    close () {
        this.setState({ active: false });
    }
    open () {
        this.setState({ active: true });
    }
    
    render() {
        var myStyle =   {
            display : (this.state.active)?"block":"none"
        };
        return(
            <div className ="page_about" style={myStyle}>
                <div className= "overlay"></div>
                <div className="aboutus">
                    <button onClick={this.close.bind(this)} className="close-button" >
                        <img src= {logoCross} width="30" height="30"/>
                    </button>
                    <h1>Our Team</h1>
                    <p>- The Cap Squad -</p>
        
                    <div className="membersList">
                        <Member image={lisa} name="Lisa Couavoux" desc="Team Leader"/>
                        <Member image={valentin} name="Valentin Bacon" desc="Graphist"/> 
                        <Member image={antoine} name="Antoine Demiere" desc="Front-end Developper"/>
                        <Member image={mael} name="Maël Crespin-Pommier" desc="Front-end Developper"/>
                        <Member image={laure} name="Laure Issa" desc="Back-end Developper"/>
                        <Member image={quentin} name="Quentin Louis" desc="Back-end Developper"/>
                        <Member image={marc} name="Marc Blactot" desc="Back-end Developper"/>
                        <Member image={albert} name="Albert-Henri Moyrand" desc="Back-end Developper"/>
                    </div>
                </div>            
            </div>
        );
    }
}
