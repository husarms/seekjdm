import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Drawer extends Component {
    componentWillReceiveProps(nextProps){
        var drawer = document.querySelector('.mdc-drawer--persistent').MDCPersistentDrawer;
        if(drawer){
            if(nextProps.isOpen){
                drawer.open = true;
            } else {
                drawer.open = false;
            }
        }
    }
    render() {
        return (
            <aside className="mdc-drawer mdc-drawer--persistent" data-mdc-auto-init="MDCPersistentDrawer">
                <nav className="mdc-drawer__drawer">
                    <div className="mdc-drawer__toolbar-spacer"/>
                    <div className="mdc-drawer__content mdc-list-group">
                        <nav className="mdc-list">
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
                        </nav>
                    </div>
                </nav>
            </aside>
        );
    }
}

Drawer.propTypes = {
    isOpen: PropTypes.bool.isRequired
}

export default Drawer;
