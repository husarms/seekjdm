import React, { Component } from 'react';
import '../css/app.css';
import '../../node_modules/material-components-web/dist/material-components-web.min.css';
import '../../node_modules/material-design-icons/iconfont/material-icons.css';
import { names } from '../constants';
import { getRandomHexColor, getComplimentaryHexColor} from '../helpers/ColorHelper';

class Names extends Component {
    constructor(props) {
        super(props);
        var initialName = this.getName();
        var primaryColor = getRandomHexColor();
        var secondaryColor = getRandomHexColor();
        var shadowColor = getComplimentaryHexColor(secondaryColor);
        this.state = {
            name: initialName,
            primaryColor: primaryColor,
            secondaryColor: secondaryColor,
            shadowColor: shadowColor
        }
        this.getRandomItemFromArray = this.getRandomItemFromArray.bind(this);
        this.getAnotherName = this.getAnotherName.bind(this);
    }
    getRandomItemFromArray(array) {
        return array[Math.floor(Math.random() * (array.length))];
    }
    toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }
    getName() {
        return this.toTitleCase(this.getRandomItemFromArray(names.primary)) + " " + this.toTitleCase(this.getRandomItemFromArray(names.secondary));
    }
    getAnotherName() {
        var name = this.getName();
        var primaryColor = getRandomHexColor();
        var secondaryColor = getRandomHexColor();
        var shadowColor = getComplimentaryHexColor(secondaryColor);
        this.setState({
            name: name,
            primaryColor: primaryColor,
            secondaryColor: secondaryColor,
            shadowColor: shadowColor
        });
    }
    render() {
        return (
            <div className="app">
                <div className="mdc-toolbar mdc-toolbar--fixed">
                    <div className="mdc-toolbar__row">
                        <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
                            <a href="/" className="material-icons mdc-toolbar__menu-icon">menu</a>
                            <span className="mdc-toolbar__title" style={{ padding: "0" }}>
                                <a href="/">
                                    <img src="/img/seekjdm.png" style={{ maxHeight: "32px" }} alt="logo" />
                                </a>
                            </span>
                        </section>
                    </div>
                </div>
                <main className="mdc-toolbar-fixed-adjust">
                    <div className="mdc-layout-grid center">
                        <div className="mdc-layout-grid__inner">
                            <div className="mdc-layout-grid__cell--span-12">
                                <div className="mdc-card">
                                    <h2>Name Generator</h2>
                                    <div>
                                        <h2 className="great-vibes"
                                            style={{ 
                                                color: this.state.primaryColor, 
                                                backgroundColor: this.state.secondaryColor,
                                                textShadow: '2px 2px ' +  this.state.shadowColor}}>
                                            {this.state.name}
                                        </h2>
                                        <p>{"(" + this.state.name + ")"}</p>
                                        <p>
                                            <button className="mdc-button mdc-button--raised" onClick={this.getAnotherName}>
                                                <i className="material-icons mdc-button__icon" aria-hidden="true">refresh</i>
                                                <span className="mdc-button__label">Generate</span>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default Names;