import React, { Component } from 'react';
import './css/app.css';
import '../node_modules/material-components-web/dist/material-components-web.min.css';
import '../node_modules/material-design-icons/iconfont/material-icons.css';
import VehicleCards from './components/VehicleCards';
import ProgressBar from './components/ProgressBar';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicles: null
        };
    }

    componentDidMount() {
        fetch('/api/vehicles')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`status ${response.status}`);
                }
                return response.json();
            })
            .then(json => {
                this.setState({
                    vehicles: json.vehicles
                });
            }).catch(e => {
            console.log(e);
        })
    }

    render() {
        return (
            <div className="app">
                {
                    this.state.vehicles ?
                        <VehicleCards vehicles={this.state.vehicles}/>
                        :
                        <div>
                            <p>Loading...</p>
                            <ProgressBar />
                        </div>
                }
            </div>
        );
    }
}

export default App;