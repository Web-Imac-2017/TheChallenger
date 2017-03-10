import React from 'react';
import { BrowserRouter as Router,
         Link } from "react-router";
import Utility from './../../utilities/utility.js';

export default class PostLikesbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            post: {
                id: null,
                likes: 0
            }
        };
        this.loadData();
    }

    loadData() {
        const postId = this.props.postId;
        Utility.query("api/user/show/"+postId, this.callback.bind(this));
    }

    callback(data) {
        console.log(data);
        this.setState({
            post: {
                id: data.id,
                likes: data.likes
            }
        });
    }

	  render(){
		    return(
                <div className="post-likes-bar">
                <img src="like.png" alt="likes" /> <p>{this.state.post.likes}</p>
                </div>
		    );
	  }
}
