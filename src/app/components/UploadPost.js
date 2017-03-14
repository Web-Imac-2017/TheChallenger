import React from "react";
import Tag from './Tag.js';
const logoCross = require("./../../img/icons/cross.png");

export default class UploadPost extends React.Component {
    constructor (props) {
        super(props);

        this.state = { active: false };
        this.open = this.open.bind(this);
        this.apiURL = "api/post/add/"+this.props.challengeId+"/";
    }
    close () {
        this.setState({ active: false });
    }
    open () {
        this.setState({ active: true });
    }

    send() {
        
    }
    
    render() {
        var myStyle =   {
            display : (this.state.active)?"block":"none"
        };
        return(
            <div className ="page_about upload_post" style={myStyle}>
                <div className= "overlay"></div>
                <div className="contact upload">
                    <button onClick={this.close.bind(this)} className="close-button" >
                        <img src= {logoCross} width="30" height="30"/>
                    </button>
                    <h1>Upload your content</h1>
                    <div className="content--tag">
                        <div className="content-box"></div>
                        <div className="tagList">
                            <h4>Pick a tag</h4>
                            <Tag name ="Audio"/>
                            <Tag name ="Video"/>
                            <Tag name ="Image"/>
                            <Tag name ="Text"/>
                            <Tag name ="Fichier"/>
                        </div>
                    </div>
                    <form className="form" method="POST" action={this.apiURL}>
                        <input type="Title" name="title" className="field-contact" placeholder="Your Title"/>
                        <textarea type = "Description" className="field-contact" placeholder="Your Description"></textarea>
                        <button className="field-contact form-btn" href="#">Share</button>
                    </form>
                      
                </div>            
            </div>
        );
    }
}
