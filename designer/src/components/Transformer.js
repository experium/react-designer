import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transformer as KonvaTransformer } from 'react-konva';

import { TRANSFORM_SETTINGS } from '../constants/settings';

export default class Transformer extends Component {
    static propTypes = {
        current: PropTypes.object,
        getRef: PropTypes.func
    };

    static defaultProps = {
        current: {}
    };

    componentDidUpdate() {
        this.checkNode();
    }

    checkNode = () => {
        const { current } = this.props;
        const stage = this.transformer.getStage();
        const selectedNode = stage.findOne(`.${current.name}`);

        if (selectedNode === this.transformer.node()) {
            this.transformer.forceUpdate();
            return;
        }

        if (selectedNode && !current.anchors) {
            this.transformer.nodes([selectedNode]);
        } else {
            this.transformer.detach();
        }

        this.transformer.getLayer().batchDraw();
    }

    render() {
        const { current, getRef } = this.props;
        const props = TRANSFORM_SETTINGS[current.type] || {};

        return <KonvaTransformer
            ref={node => {
                this.transformer = node;
                getRef && getRef(node);
            }}
            rotationSnaps={[0, 45, 90, 135, 180, 225, 270, 315, 359]}
            keepRatio
            {...props} />
    }
}
