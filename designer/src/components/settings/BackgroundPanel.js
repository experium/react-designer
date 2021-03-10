import React, { Component, Fragment } from 'react';

import { Panel } from './StyledSettingsComponents';
import Row from './Row';
import ColorPicker from './ColorPicker';
import ImageLoader from './ImageLoader';
import CurrentContext from '../context/CurrentContext';
import Checkbox from './Checkbox';
import Range from './Range';
import BackgroundAlignToggler from './BackgroundAlignToggler';

export default class BackgroundPanel extends Component {
    render() {
        const { postFileUrl } = this.props;

        return <CurrentContext.Consumer>
            { ({ settings, onChangeSettingsProp }) =>
                <Panel>
                    <Row label='Фон'>
                        <ImageLoader prop='background' postFileUrl={postFileUrl} removable />
                    </Row>
                    { !settings.pattern && settings.background &&
                        <Fragment>
                            <Row label='Заполнить'>
                                <Checkbox prop='coverBackground' />
                            </Row>
                            <Row label='Выравнивание'>
                                <BackgroundAlignToggler
                                    align={settings.backgroundAlign}
                                    onChange={onChangeSettingsProp} />
                            </Row>
                        </Fragment>
                    }
                    <Row label='Цвет фона'>
                        <ColorPicker />
                    </Row>
                    { settings.background &&
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
                </Panel>
            }
        </CurrentContext.Consumer>;
    }
}
