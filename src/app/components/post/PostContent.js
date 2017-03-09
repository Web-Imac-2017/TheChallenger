import React from 'react';
import { BrowserRouter as Router,
         Link } from "react-router";
import Utility from './../../utilities/utility.js';

export default class PostContent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            post : {
                "id" : 2,
                "user" : 1,
                "type" : "video",
                "content" : "https://www.youtube.com/embed/fWRISvgAygU",
                "description" : "Je suis une courte description",
                "likes": 8
            },
            renderContent: null
        };
        this.loadData();
    }

    preRender() {
        if(this.state.post == null)
            return null;
        // media sera inséré dans return(), comme ça ça dépend du type du post.
        let media = null;
        switch(this.state.post.type) {
        case "text":
            media = (<p>{this.state.post.content}</p>);
            break;
        case "image":
            media = (<img src={this.state.post.content} alt={this.state.post.content} />);
            break;
        case "audio":
            media = (<iframe width="100%" height="450" scrolling="no" frameborder="no" src={this.state.post.content}></iframe>);
            break;
        case "video":
            media = (<iframe width="420" height="315"
                     src={this.state.post.content}>
                     </iframe> );
            break;
        case "file":
            media = (<p>FILE: {this.state.post.content}</p>);
            break;
        default: break;
        }
        return media;
    }

    loadData() {
        var postId = this.props.postId;
        Utility.getJSON("api/user/show/"+postId, this);
    }

    callback(data) {
        console.log(data);
        this.setState({
            post : {
                id : data.id,
                type : data.type,
                content : data.content
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
