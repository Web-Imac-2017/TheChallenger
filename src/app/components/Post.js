import React from "react";

import PostProfilBar from "./post/PostProfilBar.js";
import PostContent from "./post/PostContent.js";
import PostLikesbar from "./post/PostLikesBar.js";

export default class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.post.post
        };
    }

    render() {
        return(
                <div className="post-popup">
                <PostProfilBar />
                <PostContent />
                <PostLikesbar />
                </div>
        );
    }
}
