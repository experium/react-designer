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

        render() {
            return <WrappedComponent
                {...this.props}
                onDragMove={this.onDragMove}
                onTransform={this.onTransform} />;
        }
    }
