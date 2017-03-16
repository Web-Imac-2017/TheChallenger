import React from "react";
import Utility from './../../utilities/utility.js';

const trash = require("./../../../img/icons/trash.png");

export default class DeleteBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            id : this.props.postId
        }
    }

    callback(data){
        if(data.code == "1"){
            location.reload();
        }else{
            console.log("Error suppression post id "+this.state.id+" : "+data.message)
        }
    }

    handleClick() {
        if(confirm("Do you really want to delete this post ?")){
            Utility.query("api/post/delete/"+this.state.id, this.callback.bind(this))
        }
    }

    render() {
        return(
           <div className="delete_button" onClick={this.handleClick.bind(this)}>
                <img className="logo" src={trash}/>
           </div>
        );
    }
}
