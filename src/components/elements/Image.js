import React, { Component } from 'react';
import { Image as KonvaImage, Rect } from 'react-konva';
import { equals } from 'ramda';

import elementProps from './elementProps';
import withElementHandlers from '../hocs/withElementHandlers';

class Image extends Component {
    static propTypes = {
        ...elementProps
    };

    state = {
        image: null
    };

    componentDidMount() {
        this.setImage();
    }

    componentDidUpdate(prev) {
        if (!equals(prev.element.image, this.props.element.image)) {
            this.setImage();
        }
    }

    setImage = () => {
        const { element, onChange } = this.props;

        if (element.image) {
            const image = new window.Image();

            image.src = element.image;
            image.onload = () => {
                this.setState({ image });
                onChange({
                    ...element,
                    width: image.naturalWidth,
                    height: image.naturalHeight
                });
            };
        } else {
            this.setState({ image: null });
            onChange({ ...element, width: 150, height: 150 });
        }

    }

    render() {
        const { element, onDragMove, onTransform } = this.props;
        const { image } = this.state;

        return image ?
            <KonvaImage
                {...element}
                image={image}
                onDragMove={onDragMove}
                onTransform={onTransform}
                draggable
            /> :
            <Rect
                {...element}
                fill='gray'
                draggable />;
    }
}

export default withElementHandlers(Image);
