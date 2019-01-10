import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isNil } from 'ramda';

import CurrentContext from '../context/CurrentContext';
import { Small } from './StyledSettingsComponents';

const StyledInput = styled.input`
    width: ${({ width }) => width || '50px'};
    background: rgb(225, 225, 225);
    border-width: 0px;
    padding: 3px 5px;
    color: darkslategray;
    border-radius: 3px;
    outline: none;
`;

export default class Input extends Component {
    static propTypes = {
        small: PropTypes.string,
        isNumber: PropTypes.bool,
        prop: PropTypes.string,
        parse: PropTypes.func,
        format: PropTypes.func,
        onChange: PropTypes.func
    };

    onChange = (e, onChangeProp, current) => {
        const { prop, isNumber, format, onChange } = this.props;
        const { value } = e.target;
        const val = value ? (isNumber ? Number(value.replace(/[^.0-9]/gim,'')) : value) : null;
        const formated = format ? format(val, current) : val;

        onChangeProp(prop, formated);
        onChange && onChange(formated);
    }

    getValue = current => {
        const { prop, parse } = this.props;
        const value = isNil(current[prop]) ? '' : current[prop];

        return parse ? parse(value, current) : value;
    }

    render() {
        const { small, width } = this.props;

        return <CurrentContext.Consumer>
            { ({ current, onChangeProp }) =>
                <div>
                    <StyledInput
                        type='text'
                        width={width}
                        value={this.getValue(current)}
                        onChange={e => this.onChange(e, onChangeProp, current)} />
                    { small && <Small>{ small }</Small> }
                </div>
            }
        </CurrentContext.Consumer>;
    }
}
