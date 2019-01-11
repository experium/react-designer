import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CurrentContext from '../context/CurrentContext';
import { Small } from './StyledSettingsComponents';

const StyledSelect = styled.select`
    -webkit-appearance: none;
    border-width: 0px 3px 0px 0px;
    padding: 3px 3px 3px 5px;
    outline: none;
    border-radius: 0px;
    border-right-style: solid;
    border-right-color: rgb(183, 183, 183);
    color: darkslategray;
    width: 100%;
    font-size: 11px;
`;

export default class Select extends Component {
    static propTypes = {
        options: PropTypes.arrayOf(PropTypes.object),
        prop: PropTypes.string,
        small: PropTypes.string
    };

    static defaultProps = {
        options: []
    }

    onChange = (e, onChange) => {
        const { prop } = this.props;

        onChange(prop, e.target.value);
    }

    render() {
        const { options, prop, small } = this.props;

        return <CurrentContext.Consumer>
            { ({ current, onChangeProp }) =>
                <div>
                    <StyledSelect
                        value={current[prop]}
                        onChange={e => this.onChange(e, onChangeProp)}>
                        { options.map(option =>
                            <option key={option.value} value={option.value}>
                                { option.label }
                            </option>
                        )}
                    </StyledSelect>
                    { small && <Small>{ small }</Small> }
                </div>
            }
        </CurrentContext.Consumer>;
    }
}
