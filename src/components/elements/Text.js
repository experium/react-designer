import React, { Component } from 'react';
import { Text as KonvaText } from 'react-konva';

import withElementHandlers from '../hocs/withElementHandlers';
import elementProps from './elementProps';

class Text extends Component {
    static propTypes = {
        ...elementProps
    };

    componentDidMount() {
        this.redraw();
    }

    componentDidUpdate(prev) {
        if (this.props.element.fontFamily !== prev.element.fontFamily) {
            this.redraw();
        }
    }

    redraw = () => {
        setTimeout(() => this.props.layer.draw(), 500);
    }

    render() {
        const {
            element,
            onDragMove,
            onTransform
        } = this.props;

        return <KonvaText
            {...element}
            onDragMove={onDragMove}
            onTransform={onTransform}
            draggable />
    }
}

export default withElementHandlers(Text);
