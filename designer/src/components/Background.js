import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Rect } from 'react-konva';
import { equals, startsWith } from 'ramda';

import { getBase64FromUrl } from '../utils/images';

export default class Background extends Component {
    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        settings: PropTypes.object,
        getFileUrl: PropTypes.func
    };

    state = {
        image: null
    };

    componentDidMount() {
        this.setImage();
    }

    componentDidUpdate(prev) {
        if (!equals(prev.settings.background, this.props.settings.background)) {
            this.setImage();
        }
    }

    setImage = async () => {
        let elementImage = null;

        if (this.props.getFileUrl && !startsWith('data:image', this.props.settings.background)) {
            elementImage = await getBase64FromUrl(this.props.getFileUrl(this.props.settings.background));
        } else {
            elementImage = this.props.settings.background;
        }

        const image = new window.Image();

        image.src = elementImage;
        image.onload = () => this.setState({ image });
    }

    calcPosition = (type, imgWidth, imgHeight) => {
        const { width, height } = this.props;

        return {
            x: /left/.test(type) ? 0 : /right/.test(type) ? width - imgWidth : width / 2 - imgWidth / 2,
            y: /top/.test(type) ? 0 : /bottom/.test(type) ? height - imgHeight : height / 2 - imgHeight / 2
        };
    }

    getProps = () => {
        const { image } = this.state;

        if (!image) {
            return {};
        }

        const { width, height, settings: { backgroundAlign, coverBackground }} = this.props;
        const { naturalWidth, naturalHeight } = image;

        if (!coverBackground) {
            return {
                width: naturalWidth,
                height: naturalHeight,
                ...this.calcPosition(backgroundAlign, naturalWidth, naturalHeight)
            }
        }

        const modifiedHeight = naturalHeight / (naturalWidth / width);
        const modifiedWidth = naturalWidth / (naturalHeight / height);
        const acrossWidth = height > modifiedWidth || (height < modifiedHeight && modifiedWidth < width);
        const position = this.calcPosition(backgroundAlign, modifiedWidth, modifiedHeight);

        return acrossWidth ? {
            width,
            height: modifiedHeight,
            y: position.y
        } : {
            height,
            width: modifiedWidth,
            x: position.x
        };
    }

    render() {
        const { settings, width, height } = this.props;
        const { image } = this.state;

        return settings.pattern ?
            <Rect
                fillPatternImage={image}
                fillPatternScaleX={settings.patternScale}
                fillPatternScaleY={settings.patternScale}
                width={width}
                height={height} /> :
            <Image
                image={image}
                {...this.getProps()} />;
    }
}
