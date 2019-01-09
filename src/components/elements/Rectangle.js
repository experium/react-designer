import React, { Component } from 'react';
import { Rect } from 'react-konva';

import withElementHandlers from '../hocs/withElementHandlers';
import elementProps from './elementProps';

class Rectangle extends Component {
    static propTypes = {
        ...elementProps
    };

    render() {
        const {
            element,
            onDragMove,
            onTransform
        } = this.props;

        return <Rect
            {...element}
            onDragMove={onDragMove}
            onTransform={onTransform}
            draggable
        />;
    }
}

export default withElementHandlers(Rectangle);
