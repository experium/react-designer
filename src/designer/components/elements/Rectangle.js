import React, { Component, Fragment } from 'react';
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
            onTransform,
            showHelper,
            helperWidth,
            helperHeight
        } = this.props;

        return <Fragment>
            { showHelper &&
                <Rect
                    {...element}
                    opacity={0}
                    name={`${element.name}-helper`}
                    width={helperWidth}
                    height={helperHeight}
                    onDragMove={onDragMove}
                    draggable
                />
            }
            <Rect
                {...element}
                onDragMove={onDragMove}
                onTransform={onTransform}
                draggable
            />
        </Fragment>;
    }
}

export default withElementHandlers(Rectangle);
