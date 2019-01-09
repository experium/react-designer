import React, { Component } from 'react';
import { Circle as KonvaCircle } from 'react-konva';

import withElementHandlers from '../hocs/withElementHandlers';
import elementProps from './elementProps';

class Circle extends Component {
    static propTypes = {
        ...elementProps
    };

    render() {
        const {
            element,
            onDragMove,
            onTransform
        } = this.props;

        return <KonvaCircle
            {...element}
            onDragMove={onDragMove}
            onTransform={onTransform}
            draggable
        />;
    }
}

export default withElementHandlers(Circle);
