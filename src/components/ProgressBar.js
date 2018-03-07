import React, { Component } from 'react';

class ProgressBar extends Component {
    render() {
        return (<div role="progressbar" className="mdc-linear-progress mdc-linear-progress--indeterminate">
            <div className="mdc-linear-progress__buffering-dots"/>
            <div className="mdc-linear-progress__buffer"/>
            <div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
                <span className="mdc-linear-progress__bar-inner"/>
            </div>
            <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
                <span className="mdc-linear-progress__bar-inner"/>
            </div>
        </div>);
    }
}

export default ProgressBar;