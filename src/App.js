import React, {Component} from 'react';
import './css/app.css';
import '../node_modules/material-components-web/dist/material-components-web.min.css';
import '../node_modules/material-design-icons/iconfont/material-icons.css';
import VehicleCards from './components/VehicleCards';
import ProgressBar from './components/ProgressBar';
import Constants from './components/Constants';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicles: null,
            filteredVehicles: null,
            makes: null
        };

        this.mdcInit = this.mdcInit.bind(this);
        this.fetchVehicles = this.fetchVehicles.bind(this);
        this.getMakes = this.getMakes.bind(this);
        this.openDrawer = this.openDrawer.bind(this);
        this.mdcInit = this.mdcInit.bind(this);
        this.handleMakeClick = this.handleMakeClick.bind(this);
    }

    componentDidMount(){
        // Initialize material design components
        this.mdcInit(0);
        // Get vehicles
        this.fetchVehicles();
    }
    componentDidUpdate() {
        // Re-initialize material design components
        this.mdcInit(0);
    }

    mdcInit(retries){
        var _this = this;
        if(retries > 10){
            console.warn("window.mdc not found");
            return;
        }
        if(window.mdc) {
            window.mdc.autoInit(document, () => {});
        } else {
            setTimeout(function(){
                _this.mdcInit(retries++);
            }, 100);
        }
    }

    fetchVehicles() {
        fetch('/api/vehicles')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`status ${response.status}`);
                }
                return response.json();
            })
            .then(json => {
                this.setState({
                    vehicles: json.vehicles,
                    filteredVehicles: json.vehicles,
                    makes: this.getMakes(json.vehicles)
                });
                this.getMakes();
            }).catch(e => {
            console.log(e);
        })
    }

    getMakes(vehicles){
        if(vehicles){
            const makes = Constants.makes;
            var availableMakes = [];
            let allMakesMatched = true;

            vehicles.forEach(function(vehicle){
                let matchFound = false;
                makes.forEach(function(make){
                    //Match found
                    if(vehicle.description.toLowerCase().indexOf(make.toLowerCase()) !== -1 &&
                        availableMakes.indexOf(make) === -1){
                        matchFound = true;
                        return availableMakes.push(make);
                    }
                });
                if(!matchFound && allMakesMatched){
                    allMakesMatched = false;
                }
            });
            availableMakes.push("All");
            availableMakes = availableMakes.sort();
            //Add "other" category if we could not match a make
            if(!allMakesMatched){
                availableMakes.push("Other");
            }
            return availableMakes;
        }
        return null;
    }

    openDrawer() {
        var drawer = document.querySelector('.mdc-drawer--temporary').MDCTemporaryDrawer;
        if(drawer){
            drawer.open = true;
        }
    }

    handleMakeClick(make){
        make = make.toLowerCase();
        var {vehicles} = this.state;
        if(make === "all") {
            this.setState({filteredVehicles: vehicles});
        } else if(make === "other"){
            var {makes} = this.state;
            var otherVehicles = [];
            vehicles.forEach(function(vehicle){
                var matchFound = false;
                makes.forEach(function(make){
                    if(vehicle.description.toLowerCase().includes(make.toLowerCase())){
                        matchFound = true;
                    }
                });
                if(!matchFound){
                    otherVehicles.push(vehicle);
                }
            });
            this.setState({filteredVehicles: otherVehicles});
        } else {
            var filteredVehicles = vehicles.filter(vehicle => vehicle.description.toLowerCase().includes(make));
            this.setState({filteredVehicles: filteredVehicles});
        }
    }

    render() {
        const _this = this;
        return (
                <div className="app">
                    <div className="mdc-toolbar mdc-toolbar--fixed">
                        <div className="mdc-toolbar__row">
                            <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
                                <a className="material-icons mdc-toolbar__menu-icon" onClick={() => this.openDrawer()}>menu</a>
                                <span className="mdc-toolbar__title">Seek JDM</span>
                            </section>
                        </div>
                        {
                            !this.state.filteredVehicles &&
                                <ProgressBar/>
                        }
                    </div>
                    <aside className="mdc-drawer mdc-drawer--temporary" data-mdc-auto-init="MDCTemporaryDrawer">
                        <nav className="mdc-drawer__drawer">
                            <header className="mdc-drawer__header">
                                <div
                                    className="mdc-drawer__header-content mdc-theme--text-primary-on-primary mdc-theme--primary-bg">
                                    Filter by Make
                                </div>
                            </header>
                            <nav className="mdc-drawer__content mdc-list-group">
                                <div id="icon-with-text-demo" className="mdc-list">
                                    {
                                        this.state.makes &&
                                        this.state.makes.map(function (make, i) {
                                            return (
                                                <a className="mdc-list-item" key={i} style={{cursor: "pointer"}} onClick={()=> _this.handleMakeClick(make)}
                                                   data-mdc-tabindex-handled="true" tabIndex="-1">
                                                    <i className="material-icons mdc-list-item__graphic" aria-hidden="true">lens</i>{make}
                                                </a>
                                            );
                                        })
                                    }
                                </div>
                            </nav>
                        </nav>
                    </aside>
                    <main className="mdc-toolbar-fixed-adjust">
                        {
                            this.state.filteredVehicles ?
                                <div>
                                    <VehicleCards vehicles={this.state.filteredVehicles}/>
                                </div>
                            :
                                <div className="mdc-layout-grid">
                                    <div className="mdc-layout-grid__inner">
                                        <p>Loading...</p>
                                    </div>
                                </div>
                        }
                    </main>
                </div>
            );
        }
    }

export default App;