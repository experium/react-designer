import React, { Component } from 'react';
import { Shape } from 'react-konva';
import { forEach, reduce, last, dropLast, is } from 'ramda';

import elementProps from './elementProps';
import withElementHandlers from '../hocs/withElementHandlers';

class Curve extends Component {
    static propTypes = {
        ...elementProps
    };

    sceneFunc = (context, shape) => {
        const { anchors = [], x, y, close } = this.props.element;

        context.beginPath();

        // console.log(anchors)

        // const grouped = reduce((res, cur) => {
        //     if (cur.bezier || (!cur.bezier && is(Array, last(res)))) {
        //         let lastAnchor = is(Array, last(res)) ? last(res) : [];
        //         lastAnchor.push(cur);
        //         return [...(is(Array, last(res)) ? dropLast(res) : res), lastAnchor];
        //     } else {
        //         return [...res, cur];
        //     }
        // }, [], anchors);

        // console.log(grouped)

        forEach((anchor, i) => {
            if (i === 0) {
                context.moveTo(anchor.x - x, anchor.y - y);
            } else {
                context.lineTo(anchor.x - x, anchor.y - y);
            }
        }, anchors);

        close && context.closePath();
        context.fillStrokeShape(shape);
    }

    render() {
        const { element, onDragMove, onTransform } = this.props;

        return <Shape
            {...element}
            sceneFunc={this.sceneFunc}
            onDragMove={onDragMove}
            onTransform={onTransform}
            draggable
        />;
    }
}

export default withElementHandlers(Curve);
