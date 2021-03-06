import React from 'react';
import { BrowserRouter as Router,
         Link } from "react-router";
import Utility from './../../utilities/utility.js';
import Post from './../Post.js';



export default class PostContent extends React.Component{
    constructor(props) {
        super(props);

        const defaultPost = {
            post : {
                "id" : 5,
                "user" : 1,
                "type" : "2",
                "linkcontent" : "https://www.youtube.com/embed/fWRISvgAygU",
                "description" : "Je suis une courte description",
                "likes": 8
            }
        }
        this.state = {
            post: this.props.post
        };
        //{defaultPost /*this.props.post.post*/}
        const renderCnt=this.preRender();

        this.state = {
            renderContent: renderCnt,
            post: this.props.post
        };
        this.overlay =  this.props.preview ? (
                <div className="veil" onClick={this.handlePostPopupClick.bind(this)}></div>
        ) : null;
        const post = <Post  post={this.state.post}
                            ref="postPopup"
                            affFollow={this.props.affFollow}
                            affLikes={this.props.affLikes}/>;
        this.postPopup = this.props.preview ? (post) : null;
    }

    handlePostPopupClick() {
        if(this.props.preview)
            this.refs.postPopup.open();
    }

    preRender() {
        // media sera inséré dans return(), comme ça ça dépend du type du post.
        let media = null;
        let content = this.state.post.linkcontent;
        switch(this.state.post.type) {
            case Utility.TEXT:
                media = (<p>{content}</p>);
                break;
            case Utility.IMAGE:
                content = Utility.getPublicPath()+content;
                const divStyle = {
                    backgroundImage: 'url(' + content + ')'
                }
                media = (
                    <div className="background_img" style={divStyle}></div>
                );
                break;
            case Utility.SOUNDCLOUD:
                media = (<iframe    width="100%" 
                                    height="200" 
                                    scrolling="no" 
                                    frameBorder="no" 
                                    src={content}></iframe>);
                break;
            case Utility.YOUTUBE:
                media = (<iframe width="100%" allowFullScreen frameBorder="no"
                         src={content}>
                         </iframe> );
                break;
            case Utility.LINK:
                media = (<p>FILE: {content}</p>);
                break;
            default: break;
        }
 //       console.log(media)
        return media;
    }

    render(){
        return (
            <div className="post-content" >
                {this.overlay}
                {this.state.renderContent}
                {this.postPopup}
            </div>
        );
    }
}
