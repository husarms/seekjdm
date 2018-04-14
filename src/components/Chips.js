import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from './Chip';

class Chips extends Component {
    componentDidMount(){
        if(window.mdc){
            var chipSet = document.querySelector('.mdc-chip-set');
            window.mdc.chips.MDCChipSet.attachTo(chipSet);
        }
    }
    render() {
        return (
            <div className="mdc-chip-set mdc-chip-set--filter" data-mdc-auto-init="MDCChipSet">
                {
                    this.props.items.map(function (item, i) {
                        return (
                            <Chip key={i} id={item} text={item}/>
                        );
                    })
                }
            </div>
        );
    }
}

Chip.propTypes = {
    items: PropTypes.array
}

export default Chips;
