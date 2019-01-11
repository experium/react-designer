import React, { Component } from 'react';

import { Panel } from './StyledSettingsComponents';
import Row from './Row';
import Select from './Select';
import { GLOBAL_COMPOSITE_OPERATIONS } from '../../constants/globalCompositeOperations';

export default class OverlayPanel extends Component {
    render() {
        return <Panel>
            <Row label='Наложение'>
                <Select
                    prop='globalCompositeOperation'
                    options={GLOBAL_COMPOSITE_OPERATIONS} />
            </Row>
        </Panel>
    }
}
