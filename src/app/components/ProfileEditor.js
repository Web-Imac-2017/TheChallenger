import React from "react";

export default class ProfileEditor extends React.Component {
    constructor(props) {
        super(props);
        this.apiURL = "api/user/change/"+ this.props.userId;
        this.state = {
            visible: false,
            classForm: "form hidden"
        };
    }
    open() {
        this.setState({
            visible: true,
            classForm: "form visible"
        });
        this.props.callbackParentOpen();
    }

    close() {
        this.setState({
            visible: false,
            classForm: "form hidden"
        });
        this.props.callbackParentClose();
    }

    render() {
        return(
            <div id="profile-editor" className={this.state.classForm}>
                <form className="form" id="profile-editor-form" method="POST" action={this.apiURL} encType="multipart/form-data">
                    <textarea type="text" className="field-contact description" name="description" placeholder="Your description"/>
                    <div className="up-content-file">
                        <label>
                            Choose a file
                            <input type="file" name="photo" id="up-content" className="up-content"/>
                        </label>
                    </div>
                </form>

                <div className="buttons-editor">
                    <button className="tag-btn" onClick={this.close.bind(this)} href="#">Cancel</button>
                    <button  type="submit" className="tag-btn" form="profile-editor-form" href="#">Save</button>
                </div>
            </div>
        );
    }
}
