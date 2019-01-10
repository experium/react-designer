import React, { Component, Fragment } from 'react';
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
            onTransform,
            showHelper,
            helperWidth,
            helperHeight
        } = this.props;

        return <Fragment>
            { showHelper &&
                <KonvaCircle
                    {...element}
                    opacity={0}
                    name={`${element.name}-helper`}
                    width={helperWidth}
                    height={helperHeight}
                    onDragMove={onDragMove}
                    draggable
                />
            }
            <KonvaCircle
                {...element}
                onDragMove={onDragMove}
                onTransform={onTransform}
                draggable
            />
        </Fragment>;
    }
}

export default withElementHandlers(Circle);
