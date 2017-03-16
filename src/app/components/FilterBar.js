import React 	from "react";
import Button from "./assets/Button.js";

/*
 Quand on créé une FilterBar, on lui donne en props la fonction de callback (callBackParent) pour actualiser, et une liste des filtres à afficher (filters).
 Un filtre est sous le forme :
 {
 key: myKey // identifie le filtre.
 label: myLabel // texte affiché sur le boutton de filtre
 }
 */

export default class FilterBar extends React.Component{
	  constructor(props){
		    super(props);
        this.state = {
            key: Object.keys(this.props.filters)[0] // on se met sur le premier filtre par défaut
        };
        this.buttons = null;
        this.updateButtons(Object.keys(this.props.filters)[0]);
	  }

    updateButtons(_key) {
        this.buttons = Object.entries(this.props.filters).map(function(entry) {
            return(
                    <Button key={entry} label={entry[1]} property={entry[0]} callback={this.updateFilter.bind(this)} />
            );
        }.bind(this));
    }

    updateFilter(_key) {
        if(_key == this.state.key) return null;
        this.setState({
            key: _key
        });
        this.updateButtons.bind(this);
        this.props.updateParent(_key);
        return null;
    }

	  render(){
		    return(
                <div className="filter-bar">
                {this.buttons}
                </div>
		    );
	  }
}
