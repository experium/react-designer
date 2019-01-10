import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BackgroundPanel from './BackgroundPanel';
import SizePanel from './SizePanel';
import RemovePanel from './RemovePanel';
import ColorPanel from './ColorPanel';
import OrderPanel from './OrderPanel';
import TextPanel from './TextPanel';
import ImagePanel from './ImagePanel';
import OverlayPanel from './OverlayPanel';
import LinkPanel from './LinkPanel';
import AnchorsPanel from './AnchorsPanel';
import AnchorPanel from './AnchorPanel';

const PANELS = {
    text: [SizePanel, TextPanel, ColorPanel, OverlayPanel, OrderPanel, RemovePanel],
    rect: [SizePanel, ColorPanel, OverlayPanel, OrderPanel, RemovePanel],
    circle: [SizePanel, ColorPanel, OverlayPanel, OrderPanel, RemovePanel],
    curve: [SizePanel, ColorPanel, AnchorsPanel, AnchorPanel, OverlayPanel, OrderPanel, RemovePanel],
    image: [SizePanel, ImagePanel, OverlayPanel, OrderPanel, RemovePanel],
    qr: [SizePanel, ColorPanel, LinkPanel, OrderPanel, RemovePanel]
};

export default class SettingsPanel extends Component {
    static propTypes = {
        type: PropTypes.string
    };

    getPanels = () => {
        const { type } = this.props;

        return PANELS[type] || [BackgroundPanel];
    }

    render() {
        const { type } = this.props;

        return <div>
            { this.getPanels().map((Panel, index) => <Panel key={`panel-${index}`} type={type} />) }
        </div>;
    }
}
