import React from 'react';
import { BrowserRouter as Router,
         Link } from "react-router";
import Utility from './../../utilities/utility.js';

//definition des types de fichiers
const IMAGE = 1;
const YOUTUBE = 2;
const SOUNDCLOUD = 3;
const TEXT = 4;
const LINK = 5; 

export default class PostContent extends React.Component{
    constructor(props) {
        super(props);

        const defaultPost = {
            post : {
                "id" : 5,
                "user" : 1,
                "type" : 2,
                "linkcontent" : "https://www.youtube.com/embed/fWRISvgAygU",
                "description" : "Je suis une courte description",
                "likes": 8
            }
        }
        this.state = {
            post: this.props.post
        };
        //{defaultPost /*this.props.post.post*/}
        const renderCnt=this.preRender(this.state.post.post);

        this.state = {
            renderContent: renderCnt
        };
        this.class = "post-content " + (this.props.preview ? "veil" : "");
    }

    preRender(post) {
        if(post == undefined){
            console.log("ERROR PostContent -> prerender -> post==undefined");
            return null;
        }
        console.log("prerender")
        console.log(this.state)
        // media sera inséré dans return(), comme ça ça dépend du type du post.
        let media = null;
        //console.log(this.state.post);
        switch(this.state.post.type) {
        case TEXT:
            media = (<p>{this.state.post.linkcontent}</p>);
            break;
        case IMAGE:
            media = (<img src={this.state.post.linkcontent} alt={this.state.post.linkcontent} />);
            break;
        case SOUNDCLOUD:
            media = (<iframe width="100%" height="200" scrolling="no" frameBorder="no" src={this.state.post.linkcontent}></iframe>);
            break;
        case YOUTUBE:
            media = (<iframe width="100%" allowFullScreen frameBorder="no"
                     src={this.state.post.linkcontent}>
                     </iframe> );
            break;
        case LINK:
            media = (<p>FILE: {this.state.post.linkcontent}</p>);
            break;
        default: break;
        }
        return media;
    }

    render(){
        return (
                <div className={this.class} >
                {this.state.renderContent}
            </div>
        );
    }
}
