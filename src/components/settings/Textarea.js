import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutosizeTextarea from 'react-textarea-autosize';
import styled from 'styled-components';

import CurrentContext from '../context/CurrentContext';

const StyledTextarea = styled(AutosizeTextarea)`
    background: rgb(225, 225, 225);
    border-width: 0px;
    padding: 3px 5px;
    color: darkslategray;
    border-radius: 3px;
    outline: none;
    width: 100%;
    resize: none;
`;

export default class Textarea extends Component {
    static propTypes = {
        prop: PropTypes.string
    };

    render() {
        const { prop } = this.props;

        return <CurrentContext.Consumer>
            { ({ current, onChangeProp }) =>
                <StyledTextarea
                    value={current[prop]}
                    onChange={e => onChangeProp(prop, e.target.value)} />
            }
        </CurrentContext.Consumer>;
    }
}
