import React, { Component } from 'react';

import { Panel, PanelButton } from './StyledSettingsComponents';
import AnchorsEditableContext from '../context/AnchorsEditableContext';
import Row from './Row';
import Checkbox from './Checkbox';

export default class AnchorsPanel extends Component {
    render() {
        return <Panel>
            <Row label='Опорные точки'>
                <AnchorsEditableContext.Consumer>
                    { ({ editable, onChangeEditable }) =>
                        <PanelButton onClick={() => onChangeEditable(!editable)}>
                            { editable ? 'Сохранить' : 'Добавить' }
                        </PanelButton>
                    }
                </AnchorsEditableContext.Consumer>
            </Row>
            <Row label='Замкнуть контур'>
                <Checkbox prop='close' />
            </Row>
        </Panel>;
    }
}
