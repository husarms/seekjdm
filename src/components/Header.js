import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';

class Header extends Component {
    render() {
        return (
            <div className="mdc-toolbar mdc-toolbar--fixed">
                <div className="mdc-toolbar__row">
                    <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
                        <a href="#" className="material-icons mdc-toolbar__menu-icon" onClick={() => this.props.toggleDrawerFunction()}>menu</a>
                        <span className="mdc-toolbar__title">{this.props.title}</span>
                    </section>
                    <section className="mdc-toolbar__section mdc-toolbar__section--align-end" role="toolbar">
                        <a href="#" className="material-icons mdc-toolbar__icon" aria-label="Download">file_download</a>
                        <a href="#" className="material-icons mdc-toolbar__icon" aria-label="Print this page">print</a>
                        <a href="#" className="material-icons mdc-toolbar__icon" aria-label="Bookmark this page">bookmark</a>
                    </section>
                </div>
                {
                    this.props.showProgressBar &&
                    <ProgressBar />
                }
            </div>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string,
    showProgressBar: PropTypes.bool,
    toggleDrawerFunction: PropTypes.func
}

export default Header;
