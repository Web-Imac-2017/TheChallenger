import React from "react";

export default class Timer extends React.Component{

    constructor(props){
        super(props);

        // This is called before our render function. The object that is 
        // returned is assigned to this.state, so we can use it later.

        this.state ={ elapsed: 0 };
    }

    componentDidMount(){

        // componentDidMount is called by react when the component 
        // has been rendered on the page. We can set the interval here:

        this.timer = setInterval(this.tick.bind(this), 50);
    }

    componentWillUnmount(){

        // This method is called immediately before the component is removed
        // from the page and destroyed. We can clear the interval here:

        clearInterval(this.timer);
    }

    tick(){

        // This function is called every 50 ms. It updates the 
        // elapsed counter. Calling setState causes the component to be re-rendered

        this.setState({elapsed: this.props.end - (new Date() - this.props.start)});
    }

    render() {
        
        var elapsed = Math.round(this.state.elapsed / 100);

        // This will give a number with one digit after the decimal dot (xx.x):
        var seconds = (elapsed / 10).toFixed(1);    

        // Although we return an entire <p> element, react will smartly update
        // only the changed parts, which contain the seconds variable.

        return <p>This example was started <b>{seconds} seconds</b> ago.</p>;
    }


};


/*React.renderComponent(
    <Timer start={this.props.startTime} />,
    document.body
);*/