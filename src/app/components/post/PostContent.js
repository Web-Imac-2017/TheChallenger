import React from 'react';
import { BrowserRouter as Router,
         Link } from "react-router";
import Utility from './../../utilities/utility.js';

export default class PostContent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.post.post,
            renderContent: this.preRender(this.props.post.post)
        };
        this.class = "post-content " + (this.props.preview ? "veil" : "");
    }

    preRender(post) {
        if(post == null)
            return null;
        // media sera inséré dans return(), comme ça ça dépend du type du post.
        let media = null;
        switch(post.type) {
        case "text":
            media = (<p>{post.content}</p>);
            break;
        case "image":
            media = (<img src={post.content} alt={post.content} />);
            break;
        case "audio":
            media = (<iframe width="100%" height="200" scrolling="no" frameBorder="no" src={post.content}></iframe>);
            break;
        case "video":
            media = (<iframe width="100%" allowFullScreen frameBorder="no"
                     src={this.state.post.content}>
                     </iframe> );
            break;
        case "file":
            media = (<p>FILE: {post.content}</p>);
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
