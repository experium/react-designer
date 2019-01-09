import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CurrentContext from '../context/CurrentContext';

export default class Checkbox extends Component {
    static propTypes = {
        prop: PropTypes.string
    };

    renderCheckbox = ({ current, settings, onChangeProp, onChangeSettingsProp }) => {
        const { prop } = this.props;
        const value = !!(current || settings)[prop];
        const fn = current ? onChangeProp : onChangeSettingsProp;

        return <input
            type='checkbox'
            checked={value}
            onChange={e => fn(prop, e.target.checked)} />;
    }

    render() {
        return <CurrentContext.Consumer>
            { this.renderCheckbox }
        </CurrentContext.Consumer>;
    }
}
