import React from "react";

import Utility from './../utilities/utility.js';
import ProfilBox from './../components/ProfilBox.js'
import Header   from "../components/Header.js";
import Footer   from "../components/Footer.js";
import PostsContainer from './../components/PostsContainer.js'
import ProfileEditor from './../components/ProfileEditor.js';

export default class UserProfil extends React.Component {
    constructor(props){
        super(props);

        const defaultUser = {
            "id": 3,
            "rank": 2,
            "name": "test",
            "email": "quentin54.louis@laposte.net",
            "photo": "./../img/pp.jpg",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam eos totam, delectus fuga minus dolorum labore, vitae quaerat ducimus, perferendis ipsam nisi sunt quis placeat magni obcaecati quasi distinctio quo.",
            "registerdate": "06 03 2017",
            "nbfollower": "46",
            "nbpost": "140",
            "idpost": [1, 2, 9, 4, 5]
        };

        this.state = {
            user : null,
            userConnected : null,
            openningButtonProfileEditorClass: "submit btn-default"
        };
        this.loadData();
    }

    callback = (data) => {
        this.setState({
            user : {
                "id" : data.id,
                "photo" : Utility.getPublicPath()+data.photo,
                "name" : data.name,
                "nbpost" : data.nbpost,
                "nbfollower" : data.nbfollower,
                "email" : data.email,
                "description" : data.description,
                "idpost" : data.idpost
            }
        });
        Utility.query("api/user/id/", this.callbackEditor);
    }

    loadData = () => {
        Utility.query("api/user/"+this.props.params.userId+"/infos/", this.callback);
    }

    callbackProfileEditorOpen = () => {
        this.setState({
            openningButtonProfileEditorClass: "submit btn-default hidden"
        });
    }

    callbackProfileEditorClose = () => {
        this.setState({
            openningButtonProfileEditorClass: "submit btn-default"
        });
    }

    openProfileEditor = () => {
        this.refs.ref_profile_editor.open();
    }

    callbackEditor= (data)=> {
        this.setState({
            userConnected: data.id
        });
    }

    render() {
        if(this.state.user === null)
            return null;

        let editorDiv = null;
        if(this.state.userConnected == this.state.user.id) {
            editorDiv = (<div className="wrapper-profile-editor">
    <buttton className={this.state.openningButtonProfileEditorClass} onClick={this.openProfileEditor}>Edit profile</buttton>
    <ProfileEditor ref="ref_profile_editor"
                   userId={this.state.user.id}
                   callbackParentClose={this.callbackProfileEditorClose}
                   callbackParentOpen={this.callbackProfileEditorOpen}/>
            </div>);
        }


        return(
            <div className="page">
                <Header/>
                <div id="profil">
                    {editorDiv}
                    <ProfilBox
                        id = {this.state.user.id}
                        photo = {this.state.user.photo}
                        name = {this.state.user.name}
                        nbPost = {this.state.user.nbpost}
                        nbFollower = {this.state.user.nbfollower}
                        email = {this.state.user.email}
                        desc = {this.state.user.description}
                    />
                    <PostsContainer posts={this.state.user.idpost}
                                    affFollow={false}
                                    affLikes={false}/>
                </div>
                <Footer/>
            </div>
        );
    }
}
