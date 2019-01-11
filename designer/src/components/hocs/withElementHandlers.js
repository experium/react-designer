import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { head } from 'ramda';

export default WrappedComponent =>
    class ElementHandlers extends Component {
        static propTypes = {
            element: PropTypes.object,
            onChange: PropTypes.func
        };

        getUpdatedAnchors = (x, y) => {
            const { anchors } = this.props.element;
            const headAnchor = head(anchors);
            const xDifference = x - headAnchor.x;
            const yDifference = y - headAnchor.y;

            return anchors.map(a => ({
                ...a,
                x: a.x + xDifference,
                y: a.y + yDifference
            }));
        }

        onDragMove = e => {
            const { element, onChange } = this.props;
            const x = e.target.x();
            const y = e.target.y();

            onChange({
                ...element,
                x,
                y,
                ...(element.anchors ? { anchors: this.getUpdatedAnchors(x, y) } : {})
            });
        }

        onTransform = e => {
            const { element, onChange } = this.props;

            onChange({
                ...element,
                x: e.currentTarget.x(),
                y: e.currentTarget.y(),
                rotation: e.currentTarget.rotation(),
                scaleX: e.currentTarget.scaleX(),
                scaleY: e.currentTarget.scaleY()
            });
        }

        showHelper = () => {
            const { element } = this.props;

            return Math.ceil(element.width * (element.scaleX || 1)) < 6 ||
                Math.ceil(element.height * (element.scaleY || 1)) < 6;
        }

        getHelperWidth = () => {
            const { element } = this.props;

            return Math.ceil(element.width * (element.scaleX || 1)) < 5 ? Math.ceil(5 / (element.scaleX || 1)) : element.width;
        }

        getHelperHeight = () => {
            const { element } = this.props;

            return Math.ceil(element.height * (element.scaleY || 1)) < 5 ? Math.ceil(5 / (element.scaleY || 1)) : element.height;
        }

        render() {
            return <WrappedComponent
                {...this.props}
                onDragMove={this.onDragMove}
                onTransform={this.onTransform}
                showHelper={this.showHelper()}
                helperWidth={this.getHelperWidth()}
                helperHeight={this.getHelperHeight()} />;
        }
    }
