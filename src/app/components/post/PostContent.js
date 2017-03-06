import React from 'react';
import { BrowserRouter as Router,
         Link } from "react-router";
import Utility from './../../utilities/utility.js';

export default class PostContent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            post : {
                id : null,
                // type peut valoir 'image', 'audio', 'video', 'text', 'file'.
                // description est un court texte de description (évident).
                // content dépend du type. Si c'est le post est un texte, alors c'est du texte, sinon c'est un lien vers une resource..
                type : null,
                // NOTE: pour ce component la description n'est pas utile normalement, mais c'est pour y penser dans le formet JSON d'un post.
                // description : null,
                content : null
            }
        };
    }

    loadData() {
        let postId = this.props.postId;
        let jsonPath = require("./../../json/post"+postId+".json");
        Utility.getJSON(jsonPath, this);
    }

    callback() {
        console.log(data);
        this.setState({
            post : {
                id : data.id,
                type : data.type,
                content : data.content
            }
        });
    }

    render(){
        if(this.state.user == null)
            return null;
        // media sera inséré dans return(), comme ça ça dépend du type du post.
        let media = null;
        switch(this.state.user.type) {
        case "text":
            media = (<p>{this.state.user.content}</p>);
            break;
        case "image":
            media = (<img src={this.state.user.content} alt={this.state.user.content} />);
            break;
        case "audio":
        case "video":
        case "file":
            media = (<a href={this.state.user.content}>{this.state.user.content}</a>);
            break;
        default: break;
        }
        return(
                <div className="post-content">
                <Link to={"/post/"+this.state.post.id}>
                {media}
                </Link>
                </div>
        );
    }
}
