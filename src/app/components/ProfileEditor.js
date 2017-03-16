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
                    <textarea type="text" className="description" name="description" placeholder="Your description"/>
                    <input type="text" className="birthdate" name="birthdate" placeholder="eg 1985-07-25"/>
					<input  type="file"  className="photo" name="photo"/>
				 </form>
				 
				<div className="buttons-editor">
					 <button className="field-contact form-btn" onClick={this.close.bind(this)} href="#">Cancel</button>
					<button  type="submit" className="field-contact form-btn" form="profile-editor-form" href="#">Save</button> 
				</div>
            </div>
        );
    }
}
