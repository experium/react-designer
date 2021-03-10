import React, { Component } from 'react';
import { Image as KonvaImage, Rect } from 'react-konva';
import { equals, startsWith } from 'ramda';

import elementProps from './elementProps';
import withElementHandlers from '../hocs/withElementHandlers';
import { getBase64FromUrl } from '../../utils/images';

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

    setImage = async () => {
        const { element, onChange, getFileUrl } = this.props;

        if (element.image) {
            let elementImage = null;

            if (getFileUrl && !startsWith('data:image', element.image)) {
                elementImage = await getBase64FromUrl(getFileUrl(element.image));
            } else {
                elementImage = element.image;
            }

            const image = new window.Image();

            image.src = elementImage;
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
