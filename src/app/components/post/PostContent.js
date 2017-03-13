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
        this.state = {
            post : {
                "id" : 5,
                "user" : 1,
                "type" : "video",
                "linkcontent" : "https://www.youtube.com/embed/fWRISvgAygU",
                "description" : "Je suis une courte description",
                "likes": 8
            },
            renderContent: null
        };
        this.loadData();
        this.state.renderContent = this.preRender();
    }

    preRender() {
        if(this.state.post == null)
            return null;
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

    loadData() {
        var postId = this.props.postId;
        Utility.query("api/post/show/"+postId, this.callback.bind(this));
    }

    callback(data) {
        console.log(data);
        this.setState({
            post : {
                id : data.id,
                type : data.type,
                linkcontent : data.linkcontent
            }
        });
        this.setState({
            post: this.state.post,
            renderContent: this.preRender()
        });
    }

    render(){
        return (
                <div className="post-content">
                {this.state.renderContent}
            </div>
        );
    }
}
