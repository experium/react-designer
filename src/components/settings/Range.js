import React, { Component } from 'react';

import CurrentContext from '../context/CurrentContext';

export default class Range extends Component {
    renderRange = ({ current, settings, onChangeProp, onChangeSettingsProp }) => {
        const { prop } = this.props;
        const value = (current || settings)[prop];
        const fn = current ? onChangeProp : onChangeSettingsProp;

        return <input
            type='range'
            min={.01}
            max={1}
            step={.01}
            value={String(value || 1)}
            onChange={e => fn(prop, Number(e.target.value))} />;
    }

    render() {
        return <CurrentContext.Consumer>
            { this.renderRange }
        </CurrentContext.Consumer>;
    }
}
