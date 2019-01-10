import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Rect } from 'react-konva';
import { equals } from 'ramda';

export default class Background extends Component {
    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        settings: PropTypes.object
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

    setImage = () => {
        const image = new window.Image();

        image.src = this.props.settings.background;
        image.onload = () => this.setState({ image });
    }

    getProps = () => {
        const { image } = this.state;

        if (!image) {
            return {};
        }

        const { width, height } = this.props;
        const { naturalWidth, naturalHeight } = image;
        const modifiedHeight = naturalHeight / (naturalWidth / width);
        const modifiedWidth = naturalWidth / (naturalHeight / height);
        const acrossWidth = height > modifiedWidth || (height < modifiedHeight && modifiedWidth < width);

        return acrossWidth ? {
            width,
            height: modifiedHeight,
            y: -modifiedHeight / 2 + (height / 2)
        } : {
            height,
            width: modifiedWidth,
            x: -modifiedWidth / 2 + (width / 2)
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
