import React, { Component } from 'react';

import { Panel } from './StyledSettingsComponents';
import Row from './Row';
import ImageLoader from './ImageLoader';

export default class ImagePanel extends Component {
    render() {
        const { getFileUrl, postFileUrl } = this.props;

        return <Panel>
            <Row label='Изображение'>
                <ImageLoader prop='image' postFileUrl={postFileUrl} />
            </Row>
        </Panel>
    }
}
