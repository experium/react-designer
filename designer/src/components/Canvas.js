import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer, Rect, Circle as KonvaCircle, Line } from 'react-konva';
import { find, propEq, filter, has, pathEq, update, equals, head, unnest } from 'ramda';
import WebFont from 'webfontloader';

import Transformer from './Transformer';
import Rectangle from './elements/Rectangle';
import Circle from './elements/Circle';
import Text from './elements/Text';
import { FONTS } from '../constants/fonts';
import Background from './Background';
import Image from './elements/Image';
import Qr from './elements/Qr';
import Curve from './elements/Curve';

const ELEMENTS = {
    text: Text,
    rect: Rectangle,
    circle: Circle,
    curve: Curve,
    image: Image,
    qr: Qr
};

export default class Canvas extends Component {
    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        current: PropTypes.object,
        onChangeCurrent: PropTypes.func,
        onAddElement: PropTypes.func,
        onChangeCurrentElement: PropTypes.func,
        onChangeCurrentProp: PropTypes.func,
        onAddAnchor: PropTypes.func,
        anchorsEditable: PropTypes.bool,
        onChangeCurrentAnchor: PropTypes.func,
        currentAnchor: PropTypes.object,
        elements: PropTypes.arrayOf(PropTypes.object)
    };

    componentDidMount() {
        WebFont.load({
            google: {
                families: FONTS.map(i => i.value)
            },
            classes: false
        });
    }

    handleStageMouseDown = e => {
        const { onChangeCurrent, elements, selectedType, onAddElement, current, onAddAnchor, anchorsEditable } = this.props;

        if (selectedType) {
            onAddElement(e.evt.layerX, e.evt.layerY)
            return;
        }

        if (e.target === e.target.getStage()) {
            onChangeCurrent(null);
            return;
        }

        if (e.target.getParent().className === 'Transformer' || e.target.attrs.className === 'anchor') {
            return;
        }

        const name = (e.target.name() || '').replace('-helper', '');
        const element = find(propEq('name', name), elements);

        if (element && !anchorsEditable) {
            onChangeCurrent(name);
        } else {
            current && current.anchors && anchorsEditable ?
                onAddAnchor(e.evt.layerX, e.evt.layerY) :
                onChangeCurrent(null);
        }
    }

    renderElement = element => {
        const { onChangeCurrentElement } = this.props;
        const Component = ELEMENTS[element.type];

        return <Component
            key={element.name}
            element={element}
            onChange={onChangeCurrentElement}
            layer={this.layer} />;
    }

    getElementsWithAnchors = () => {
        const { elements } = this.props;

        return filter(has('anchors'), elements);
    }

    onDragAnchor = (e, index) => {
        const { onChangeCurrentElement, current } = this.props;

        if (current) {
            const x = e.target.x();
            const y = e.target.y();

            onChangeCurrentElement({
                ...current,
                x: index ? current.x : x,
                y: index ? current.y : y,
                anchors: update(index, { ...current.anchors[index], x, y }, current.anchors)
            });
        }
    }

    renderAnchors = element => {
        const { onChangeCurrentAnchor, currentAnchor } = this.props;
        const show = pathEq(['current', 'name'], element.name, this.props);

        return show && element.anchors.map((anchor, index) =>
            <KonvaCircle
                key={`anchor-${element.name}-${index}`}
                className='anchor'
                x={anchor.x}
                y={anchor.y}
                fill='white'
                stroke='rgb(0, 161, 255)'
                strokeWidth={equals(currentAnchor, { name: element.name, index }) ? 2 : 1}
                width={10}
                height={10}
                onDragMove={e => this.onDragAnchor(e, index)}
                onDragStart={() => onChangeCurrentAnchor(element.name, index)}
                onClick={() => onChangeCurrentAnchor(element.name, index)}
                draggable />
        );
    }

    renderAnchorBorder = element => {
        const headAnchor = head(element.anchors);
        const show = pathEq(['current', 'name'], element.name, this.props) && headAnchor;
        const points = unnest(element.anchors.map(({ x, y }) => ([x, y])));

        return show &&
            <Line
                stroke='rgb(0, 161, 255)'
                strokeWidth={1}
                key={`anchor-border-${element.name}`}
                points={element.close ? [ ...points, headAnchor.x, headAnchor.y ] : points} />;
    }

    render() {
        const { width, height, current, elements, settings } = this.props;
        const elementsWithAnchors = this.getElementsWithAnchors();

        return <Stage
            width={width}
            height={height}
            onMouseDown={this.handleStageMouseDown}>
            <Layer>
                <Rect
                    width={width}
                    height={height}
                    fill={settings.fill} />
            </Layer>
            { settings.background &&
                <Layer>
                    <Background
                        settings={settings}
                        width={width}
                        height={height} />
                </Layer>
            }
            <Layer ref={node => this.layer = node}>
                { elements.map(this.renderElement) }
                <Transformer current={current} />
            </Layer>
            <Layer>
                { elementsWithAnchors.map(this.renderAnchorBorder) }
                { elementsWithAnchors.map(this.renderAnchors) }
            </Layer>
        </Stage>;
    }
}
