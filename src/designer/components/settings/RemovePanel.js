import React, { Component } from 'react';

import { Panel, PanelButton } from './StyledSettingsComponents';
import CurrentContext from '../context/CurrentContext';

export default class RemovePanel extends Component {
    render() {
        return <CurrentContext.Consumer>
            { ({ onRemove }) =>
                <Panel>
                    <PanelButton onClick={onRemove}>Удалить</PanelButton>
                </Panel>
            }
        </CurrentContext.Consumer>;
    }
}
