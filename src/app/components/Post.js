import React from "react";

import PostProfilBar from "./post/PostProfilBar.js";
import PostContent from "./post/PostContent.js";
import PostLikesbar from "./post/PostLikesBar.js";

const logoCross = require("./../../img/icons/cross.png");

export default class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.post,
            active: false
        };
    }

    open() {
        this.setState({ active: true });
    }

    close() {
        this.setState({ active: false });
    }

    render() {
        let myStyle = { display: (this.state.active) ? "block" : "none" };
        return(
                <div className="content_popup" style={myStyle}>
                    <div className="overlay"></div>
                    <div className="post-popup">
                        <button onClick={this.close.bind(this)} className="close-button">
                            <img src= {logoCross} width="30" height="30"/>
                        </button>
                        <PostProfilBar userId={this.state.post.iduser} />
                        <PostContent post={this.state.post} preview={false} />
                        <PostLikesbar postId={this.state.post.id}/>
                        <h4>{this.state.post.title}</h4>
                        <p>{this.state.post.description}</p>
               	    </div>		
                </div>
        );
    }
}
