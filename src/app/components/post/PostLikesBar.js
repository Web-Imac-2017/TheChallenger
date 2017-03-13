import React from 'react';
import { BrowserRouter as Router,
         Link } from "react-router";
import Utility from './../../utilities/utility.js';

const likeImg = require("./../../../img/icons/like.png");
const noLikeImg = require("./../../../img/icons/no-like.png");

export default class PostLikesBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            post: {
                id: null,
                likes: 0
            },
            userLike: 0
        };
        this.loadData();
        this.img = noLikeImg; // par défaut
    }

    loadData() {
        const postId = this.props.postId;
        Utility.query("api/post/show/"+postId, this.callbackNbLikes.bind(this));
        Utility.query("api/post/like/check/"+postId, this.callbackUserLike.bind(this));
    }

    callbackNbLikes(data) {
        //console.log(data);
        this.setState({
            post: {
                id: data.id,
                likes: data.likes
            }
        });
    }

    callbackUserLike(data) {
        //console.log(data);
        this.setState({
            userLike: data.code
        });
        this.img = this.state.userLike ? likeImg : noLikeImg;
    }

    callbackLike() {
        const postId = this.props.postId;
        Utility.query("api/post/like/add/"+postId, ()=>{});
        this.loadData();
    }

	  render(){
		    return(
                <div className="post-likes-bar">
                <img src={this.img} alt="likes" onClick={this.callbackLike.bind(this)} />
                <p>{this.state.post.likes}</p>
                </div>
		    );
	  }
}
