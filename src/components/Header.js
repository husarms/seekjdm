import React, { Component } from 'react';

class Header extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (<header className="mdc-toolbar mdc-toolbar--fixed demo-toolbar">
            <div className="mdc-toolbar__row">
                <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
                    <a href="#" className="material-icons mdc-toolbar__menu-icon">menu</a>
                    <span className="mdc-toolbar__title">{this.props.title}</span>
                </section>
                <section className="mdc-toolbar__section mdc-toolbar__section--align-end" role="toolbar">
                    <a href="#" className="material-icons mdc-toolbar__icon" aria-label="Download">file_download</a>
                    <a href="#" className="material-icons mdc-toolbar__icon" aria-label="Print this page">print</a>
                    <a href="#" className="material-icons mdc-toolbar__icon" aria-label="Bookmark this page">bookmark</a>
                </section>
            </div>
        </header>);
    }
}

export default Header;