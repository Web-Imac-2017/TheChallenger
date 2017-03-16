import React from "react";

export default class Timer extends React.Component{

    constructor(props){
        super(props);

        // This is called before our render function. The object that is 
        // returned is assigned to this.state, so we can use it later.

        this.state = { timer: null };
        /* console.log("TIMER")
         * console.log("end " + this.props.end)
         */
        
        
    }

    componentDidMount(){
        this.timer = setInterval(this.tick.bind(this), 1000);
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    startTimer(){
        // Update the count down every 1 second
               
    }

    tick(){
        // Get todays date and time
        var now = new Date().getTime();
        var count = new Date(this.props.end).getTime();

        // Find the distance between now an the count down date
        var distance = count - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        this.setState({
            timer: days + "d " + hours + "h "+ minutes + "m " + seconds + "s " 
        });
    }

    render() {
        return <h1>{this.state.timer}</h1>;
    }


};


/*React.renderComponent(
    <Timer start={this.props.startTime} />,
    document.body
);*/
