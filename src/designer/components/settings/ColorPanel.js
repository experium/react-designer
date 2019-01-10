import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Panel } from './StyledSettingsComponents';
import Row from './Row';
import ColorPicker from './ColorPicker';
import Input from './Input';

const StrokeContainer = styled.div`
    display: flex;
    & > div:first-of-type {
        margin-right: 10px;
    }
`;

export default class ColorPanel extends Component {
    static propTypes = {
        type: PropTypes.string
    };

    render() {
        const { type } = this.props;

        return <Panel>
            <Row label='Заливка'>
                <ColorPicker />
            </Row>
            { type !== 'qr' &&
                <Row label='Обводка'>
                    <StrokeContainer>
                        <ColorPicker prop='stroke' />
                        <Input prop='strokeWidth' isNumber small='толщина' />
                    </StrokeContainer>
                </Row>
            }
        </Panel>
    }
}
