import React, { Component, Fragment } from 'react';

import { Panel } from './StyledSettingsComponents';
import Row from './Row';
import ColorPicker from './ColorPicker';
import ImageLoader from './ImageLoader';
import CurrentContext from '../context/CurrentContext';
import Checkbox from './Checkbox';
import Range from './Range';

export default class BackgroundPanel extends Component {
    render() {
        return <Panel>
            <Row label='Фон'>
                <ImageLoader prop='background' removable />
            </Row>
            <Row label='Цвет фона'>
                <ColorPicker />
            </Row>
            <CurrentContext.Consumer>
                { ({ settings }) => settings.background &&
                    <Fragment>
                        <Row label='Паттерн'>
                            <Checkbox prop='pattern' />
                        </Row>
                        { settings.pattern &&
                            <Row label='Масштаб'>
                                <Range prop='patternScale' />
                            </Row>
                        }
                    </Fragment>
                }
            </CurrentContext.Consumer>
        </Panel>;
    }
}
