import React, { Component } from 'react'

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 25,
            testLog: [],
        }
        console.log("Constructor");
    }

    componentDidMount() {
        console.log("ComponentDidMount");
        // API requests 
        this.setState({
            value: 50,
        })
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("Component Did Update");
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("Should Component Update");
        return true;
    }


    render() {
        console.log("Render");

        return (
            <div className="card">
                <div className="card-header d-flex justify-between-content">
                    <h3>TEST For React Lifecycles</h3>
                </div>
                <div className="card-body">
                    Test
                </div>
            </div>
        )
    }
}

export default Test;