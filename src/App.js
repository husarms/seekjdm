import React, { Component } from 'react';
import './css/app.css';
import '../node_modules/material-components-web/dist/material-components-web.min.css';
import '../node_modules/material-design-icons/iconfont/material-icons.css';
import Header from './components/Header';
import Drawer from './components/Drawer';
import ProgressBar from './components/ProgressBar';
import VehicleCards from './components/VehicleCards';

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
                <Header title={"Seek JDM"}/>
                <Drawer />
                <div className="content">
                {
                    this.state.vehicles ?
                        <div>
                            <VehicleCards vehicles={this.state.vehicles}/>
                        </div>
                        :
                        <div>
                            <p>Loading...</p>
                            <ProgressBar />
                        </div>
                }
                </div>
            </div>
        );
    }
}

export default App;