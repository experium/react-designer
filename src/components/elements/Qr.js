import React, { Component } from 'react';
import { Rect, Shape } from 'react-konva';
import qrcode from 'qr.js';

import elementProps from './elementProps';
import { convertStr } from '../../utils/qr';
import withElementHandlers from '../hocs/withElementHandlers';

class Qr extends Component {
    static propTypes = {
        ...elementProps
    };

    sceneFunc = (context, shape) => {
        const { element } = this.props;

        const qr = qrcode(convertStr(element.link));
        const cells = qr.modules;
        const numCells = cells.length;
        const scale = element.width / numCells;

        context.scale(scale, scale);
        context.fillStyle = element.fill;
        context.fillRect(0, 0, numCells, numCells);

        cells.forEach(function(row, rdx) {
            row.forEach(function(cell, cdx) {
                if (cell) {
                    context.beginPath();
                    context.rect(cdx, rdx, 1, 1);
                    context.closePath();
                    context.fillStrokeShape(shape);
                }
            });
        });
    }

    render() {
        const { element, onDragMove, onTransform } = this.props;

        return element.link ?
            <Shape
                {...element}
                fill='black'
                sceneFunc={this.sceneFunc}
                onDragMove={onDragMove}
                onTransform={onTransform}
                draggable /> :
            <Rect
                {...element}
                onDragMove={onDragMove}
                onTransform={onTransform}
                draggable />;
    }
}

export default withElementHandlers(Qr);
