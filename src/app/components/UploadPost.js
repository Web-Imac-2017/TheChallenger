import React from "react";
import Tag from './Tag.js';
const logoCross = require("./../../img/icons/cross.png");

export default class UploadPost extends React.Component {
    constructor (props) {
        super(props);

        this.state = { active: false };
        this.open = this.open.bind(this);
        this.apiURL = "api/post/add/"+this.props.challengeId+"/";
        this.state = {contentInput: this.getContentInput("image") };
        this.labelType = "Image";
    }
    close () {
        this.setState({ active: false });
    }
    open () {
        this.setState({ active: true });
    }

    getContentInput(type) {
        switch(type) {
            case "image":
                return(<div className="up-content-file">
                            <label>
                                Choose a file
                                <input type="file" name="file" id="up-content" className="up-content"/>
                            </label>
                        </div>);
            case "text":
                return(<textarea type = "text" name="link" id="up-content" className="field-contact" placeholder="Write your text"></textarea>);
            case "video":
            case "audio":
            case "link":
                return (<input type="text" id="up-content" name="link" className="field-contact" placeholder="Link (Youtube, Soundcloud, URL)" />);
            default: return null;
        }
    }

    send() {
        console.log(document.getElementById("up-title").value);
        console.log(document.getElementById("up-description").value);
    }

    convertTypeToText(type) {
        switch(type) {
            case "text" : return "Text";
            case "image" : return "Image";
            case "audio" : return "Audio";
            case "video" : return "Video";
            case "link" : return "Link";
            default: return "Unknwown type";
        }
    }

    updateTagAndType(value) {
        this.labelType = this.convertTypeToText(value);
        document.getElementById("up-tag").value = value;
        document.getElementById("up-type").value = value;
    }

    callBackTags(value) {
        this.updateTagAndType(value);
        this.setState({
            contentInput: this.getContentInput(value)
        });
    }
    
    render() {
        var myStyle =   {
            display : (this.state.active)?"block":"none"
        };
        /* let readOnlyAttribute = { readOnly: "readOnly" };*/
        return(
            <div className ="page_about upload_post" style={myStyle}>
                <div className= "overlay"></div>
                <div className="contact upload">
                    <button onClick={this.close.bind(this)} className="close-button" >
                        <img src= {logoCross} width="30" height="30"/>
                    </button>
                    <h1>Upload your content</h1>
                    <div className="content--tag">
                        <h4>Pick one tag</h4>
                        <div className="tagList">
                            <Tag value="audio" callbackParent={this.callBackTags.bind(this)} name ="Audio"/>
                            <Tag value="video" callbackParent={this.callBackTags.bind(this)} name ="Video"/>
                            <Tag value="image" callbackParent={this.callBackTags.bind(this)} name ="Image"/>
                            <Tag value="text" callbackParent={this.callBackTags.bind(this)} name ="Text"/>
                            <Tag value="link" callbackParent={this.callBackTags.bind(this)} name ="Link"/>
                        </div>
                    </div>
                    <form className="form" method="POST" action={this.apiURL} encType="multipart/form-data">
                        <input type="text" name="tag" id="up-tag" hidden value="image" />
                        <input type="text" name="type" id="up-type" hidden value="image" />
                        <p>Type: {this.labelType}</p>
                        {this.state.contentInput}
                        <input type="text" name="title" id="up-title" className="field-contact" placeholder="Your Title"/>
                        <textarea type = "text" id="up-description" className="field-contact" placeholder="Your Description" name="desc"></textarea>
                        <button className="field-contact form-btn" href="#">Share</button>
                    </form>
                </div>
            </div>
        );
    }
}
