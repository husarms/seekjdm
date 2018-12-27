import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Vehicles from "./containers/Vehicles";
import Names from "./containers/Names";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Vehicles} />
                    <Route path="/names" component={Names} />
                </div>
            </Router>
        );
    }
}

export default App;
