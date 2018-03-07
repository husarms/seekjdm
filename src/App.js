import React, { Component } from 'react';
import './css/app.css';
import '../node_modules/material-components-web/dist/material-components-web.min.css';
import '../node_modules/material-design-icons/iconfont/material-icons.css';
import DateFormat from 'dateformat';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicles: null,
            fetching: true
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

    numberOfDaysBetween (date1, date2) {
        var parsedDate1 = new Date(Date.parse(date1));
        var parsedDate2 = new Date(Date.parse(date2));
        var diff = Math.abs(parsedDate1.getTime() - parsedDate2.getTime());
        return diff / (1000 * 60 * 60 * 24);
    }

    isDateWithinDays(date, days){
        var todaysDate = new Date().toISOString();
        var daysBetween = this.numberOfDaysBetween(date, todaysDate);
        return daysBetween < days;
    }

    renderProgressBar(){
        return (<div role="progressbar" className="mdc-linear-progress mdc-linear-progress--indeterminate">
            <div className="mdc-linear-progress__buffering-dots"></div>
            <div className="mdc-linear-progress__buffer"></div>
            <div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
                <span className="mdc-linear-progress__bar-inner"></span>
            </div>
            <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
                <span className="mdc-linear-progress__bar-inner"></span>
            </div>
        </div>);
    }

    render() {
        var _this = this;
        return (
            <div className="app">
                {
                    this.state.vehicles ?
                        <div>
                            <h1 className="mdc-typography--display3">Suh Dude?</h1>
                            <div className="mdc-layout-grid">
                                <div className="mdc-layout-grid__inner">
                                    {
                                        this.state.vehicles.map(function(vehicle, i){
                                            return (
                                                <div key={i} className="mdc-layout-grid__cell" onClick={() => window.open(vehicle.url)}>
                                                    <div className="mdc-card">
                                                        <div className="mdc-card__primary-action">
                                                            <img src={vehicle.image} alt={vehicle.description} style={{width: "100%", height: "100%"}}/>
                                                            <h1 className="mdc-typography--headline">
                                                                {
                                                                    _this.isDateWithinDays(vehicle.timestamp, 1) &&
                                                                    <i className="material-icons md-36" style={{color: "#FB8C00"}}>fiber_new</i>
                                                                }
                                                                {vehicle.description}
                                                            </h1>
                                                            <p className="mdc-typography--body1">{vehicle.shortDescription !== "" ? vehicle.shortDescription : "--"}</p>
                                                            <p className="mdc-typography--body1">{vehicle.price}</p>
                                                            <p className="mdc-typography--body1">
                                                                {DateFormat(vehicle.timestamp, "m/d/yyyy h:MM TT")}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            <p>Loading...</p>
                            {this.renderProgressBar()}
                        </div>
                }
            </div>
        );
    }
}

export default App;