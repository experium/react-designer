import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.label`
    cursor: pointer;
    width: 14px;
    position: relative;
    input {
        position: absolute;
        opacity: 0;
        height: 0;
        width: 0;
    }
`;

const Checkmark = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 14px;
    width: 14px;
    background-color: rgb(225,225,225);
    border-radius: 3px;
    color: darkslategray;
    display: inline-block;
    font-size: 10px;
    padding-left: 2px;
    padding-top: 1px;
`;

import CurrentContext from '../context/CurrentContext';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default class Checkbox extends Component {
    static propTypes = {
        prop: PropTypes.string
    };

    renderCheckbox = ({ current, settings, onChangeProp, onChangeSettingsProp }) => {
        const { prop } = this.props;
        const value = !!(current || settings)[prop];
        const fn = current ? onChangeProp : onChangeSettingsProp;

        return <Container>
            <input
                type='checkbox'
                checked={value}
                onChange={e => fn(prop, e.target.checked)} />
            <Checkmark>
                { value && <FontAwesomeIcon icon={faCheck} /> }
            </Checkmark>
        </Container>;
    }

    render() {
        return <CurrentContext.Consumer>
            { this.renderCheckbox }
        </CurrentContext.Consumer>;
    }
}
