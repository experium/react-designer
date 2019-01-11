import React, { Component } from 'react';

import { Panel } from './StyledSettingsComponents';
import Row from './Row';
import Input from './Input';

export default class LinkPanel extends Component {
    render() {
        return <Panel>
            <Row label='Ссылка'>
                <Input prop='link' width='100%' />
            </Row>
        </Panel>;
    }
}
