import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Chip extends Component {
    toggleSelect(){
        var chip = document.getElementById(this.props.id).MDCChip;
        if(chip){
            chip.toggleSelected();
        }
    }
    render() {
        return (
            <div id={this.props.id} className="mdc-chip" data-mdc-auto-init="MDCChip" onClick={() => this.toggleSelect()}>
                <div className="mdc-chip__checkmark" >
                    <svg className="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
                        <path className="mdc-chip__checkmark-path" fill="none" stroke="black"
                              d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
                    </svg>
                </div>
                <div className="mdc-chip__text">{this.props.text}</div>
            </div>
        );
    }
}

Chip.propTypes = {
    id: PropTypes.string,
    text: PropTypes.string
}

export default Chip;
