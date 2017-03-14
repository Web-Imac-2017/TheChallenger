import React from 'react';
import { BrowserRouter as Router,
         Link } from "react-router";
import Utility from './../../utilities/utility.js';

import Post from './../Post.js';

export default class PostContent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.post,
            renderContent: this.preRender(this.props.post)
        };
        this.overlay =  this.props.preview ? (
                <div className="veil" onClick={this.handlePostPopupClick.bind(this)}></div>
        ) : null;
        this.postPopup = this.props.preview ? (<Post post={this.state.post} ref="postPopup"/>) : null;
        console.log("bonjour"+this.state.post);
        // this.postPopup = (<Post post={this.state.post} ref="postPopup"/>);
    }

    handlePostPopupClick() {
        if(this.props.preview)
            this.refs.postPopup.open();
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
                <div className="post-content" >
                {this.state.renderContent}
            {this.overlay}
            {this.postPopup}
            </div>
        );
    }
}
