import React, { Component } from 'react';

class Drawer extends Component {
    componentDidMount(){
        //Initialize material design components
        if (window.mdc) {
            window.mdc.autoInit(document, () => {});
        }
    }
    componentDidUpdate() {
        //Re-initialize material design components
        if (window.mdc) {
            window.mdc.autoInit(document, () => {});
        }
    }
    render() {
        return (<aside className="mdc-drawer mdc-drawer--temporary" style={{opacity: "0"}}>
            <nav className="mdc-drawer__drawer">
                <header className="mdc-drawer__header">
                    <div className="mdc-drawer__header-content mdc-theme--text-primary-on-primary mdc-theme--primary-bg">
                        Header here
                    </div>
                </header>
                <nav className="mdc-drawer__content mdc-list-group">
                    <div className="mdc-list">
                        <a className="mdc-list-item mdc-list-item--selected" href="#" data-mdc-tabindex-handled="true">
                            <i className="material-icons mdc-list-item__graphic" aria-hidden="true">inbox</i>Inbox
                        </a>
                        <a className="mdc-list-item" href="#" data-mdc-tabindex-handled="true">
                            <i className="material-icons mdc-list-item__graphic" aria-hidden="true">star</i>Star
                        </a>
                        <a className="mdc-list-item" href="#" data-mdc-tabindex-handled="true">
                            <i className="material-icons mdc-list-item__graphic" aria-hidden="true">send</i>Sent Mail
                        </a>
                        <a className="mdc-list-item" href="#" data-mdc-tabindex-handled="true">
                            <i className="material-icons mdc-list-item__graphic" aria-hidden="true">drafts</i>Drafts
                        </a>
                    </div>
                    <hr className="mdc-list-divider"/>
                    <div className="mdc-list">
                        <a className="mdc-list-item" href="#" data-mdc-tabindex-handled="true">
                            <i className="material-icons mdc-list-item__graphic" aria-hidden="true">email</i>All Mail
                        </a>
                        <a className="mdc-list-item" href="#" data-mdc-tabindex-handled="true">
                            <i className="material-icons mdc-list-item__graphic" aria-hidden="true">delete</i>Trash
                        </a>
                        <a className="mdc-list-item" href="#" data-mdc-tabindex-handled="true">
                            <i className="material-icons mdc-list-item__graphic" aria-hidden="true">report</i>Spam
                        </a>
                    </div>
                </nav>
            </nav>
        </aside>);
    }
}

export default Drawer;
