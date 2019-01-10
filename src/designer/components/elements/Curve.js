import React, { Component } from 'react';
import { Shape } from 'react-konva';
import { forEach, reduce, last, dropLast, is, unnest, any, propEq } from 'ramda';

import elementProps from './elementProps';
import withElementHandlers from '../hocs/withElementHandlers';

class Curve extends Component {
    static propTypes = {
        ...elementProps
    };

    sceneFunc = (context, shape) => {
        const { anchors = [], x, y, close } = this.props.element;

        context.beginPath();

        const grouped = reduce((res, cur) => {
            const lastIsArray = is(Array, last(res));

            if (cur.bezier || (!cur.bezier && lastIsArray && !any(propEq('bezier', false), last(res)))) {
                const isCurve = lastIsArray && last(last(res)).bezier;
                let lastAnchor = isCurve ? last(res) : [];
                lastAnchor.push(cur);
                return [...(isCurve ? dropLast(1, res) : res), lastAnchor];
            } else {
                return [...res, cur];
            }
        }, [], anchors);

        forEach((anchor, i) => {
            if (is(Array, anchor)) {
                const points = unnest(anchor.map(({ x: aX, y: aY }) => ([aX - x, aY - y])));

                if (points.length === 2) {
                    context.lineTo(...points);
                } if (points.length === 4) {
                    context.quadraticCurveTo(...points);
                } else {
                    context.bezierCurveTo(...points);
                }
            } else {
                if (i === 0) {
                    context.moveTo(anchor.x - x, anchor.y - y);
                } else {
                    context.lineTo(anchor.x - x, anchor.y - y);
                }
            }
        }, grouped);

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
