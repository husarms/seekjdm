import React, { Component } from 'react';
import DateFormat from 'dateformat';

class VehicleCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicles: this.props.vehicles
        };
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

    render() {
        var _this = this;
        return (
            <div>
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
        );
    }
}

export default VehicleCards;