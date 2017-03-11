import React 	from "react";

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
	  }

    updateFilter(_key) {
        if(_key == this.state.key) return null;
        let currentKey = this.props.filters[_key];
        this.setState({
            key: _key
        });
        this.buttons = Object.entries(this.props.filters).map(function(entry) {
            return(
                    <button filterKey={entry[0]} onClick={()=>{console.log("Boutton clicked!");}}>
                    {entry[1]}
                </button>
                  );
        });
        this.props.updateParent();
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
