import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { has, head } from 'ramda';

import { Panel } from './StyledSettingsComponents';
import Row from './Row';
import Input from './Input';
import { TRANSFORM_SETTINGS } from '../../constants/settings';
import CurrentContext from '../context/CurrentContext';

const Inputs = styled.div`
    display: flex;
    & > div:first-of-type {
        margin-right: 10px;
    }
`;

export default class SizePanel extends Component {
    static propTypes = {
        type: PropTypes.string
    };

    disabledProp = path => {
        const { type } = this.props;
        const settings = TRANSFORM_SETTINGS[type];

        return settings && has(path, settings) && !settings[path];
    }

    parseWidth = (value, current) => {
        const { scaleX = 1 } = current;

        return Math.abs(Math.round((isNaN(value) ? 0 : value) * scaleX));
    }

    formatWidth = (value, current) => {
        const { scaleX = 1 } = current;

        return Math.abs(Math.round((isNaN(value) ? 0 : value) / scaleX));
    }

    parseHeight = (value, current) => {
        const { scaleY = 1 } = current;

        return Math.abs(Math.round((isNaN(value) ? 0 : value) * scaleY));
    }

    formatHeight = (value, current) => {
        const { scaleY = 1 } = current;

        return Math.abs(Math.round((isNaN(value) ? 0 : value) / scaleY));
    }

    onChangeX = (x, current, onChange) => {
        if (current.anchors) {
            const headAnchor = head(current.anchors);
            const xDifference = x - headAnchor.x;

            const anchors = current.anchors.map(a => ({
                ...a,
                x: a.x + xDifference
            }));

            onChange({ ...current, x, anchors });
        }
    }

    onChangeY = (y, current, onChange) => {
        if (current.anchors) {
            const headAnchor = head(current.anchors);
            const yDifference = y - headAnchor.y;

            const anchors = current.anchors.map(a => ({
                ...a,
                y: a.y + yDifference
            }));

            onChange({ ...current, y, anchors });
        }
    }

    render() {
        return <Panel>
            { !this.disabledProp('resizeEnabled') &&
                <Row label='Размер'>
                    <Inputs>
                        <Input
                            prop='width'
                            small='ширина'
                            parse={this.parseWidth}
                            format={this.formatWidth}
                            isNumber />
                        <Input
                            prop='height'
                            small='высота'
                            parse={this.parseHeight}
                            format={this.formatHeight}
                            isNumber />
                    </Inputs>
                </Row>
            }
            <Row label='Позиция'>
                <CurrentContext.Consumer>
                    { ({ current, onChange }) =>
                        <Inputs>
                            <Input
                                prop='x'
                                small='слева'
                                isNumber
                                onChange={x => this.onChangeX(x, current, onChange)} />
                            <Input
                                prop='y'
                                small='сверху'
                                isNumber
                                onChange={y => this.onChangeY(y, current, onChange)} />
                        </Inputs>
                    }
                </CurrentContext.Consumer>
            </Row>
            { !this.disabledProp('rotateEnabled') &&
                <Row label='Поворот'>
                    <Input prop='rotation' small='угол' isNumber />
                </Row>
            }
        </Panel>;
    }
}
