import PropTypes from 'prop-types';

const elementProps = {
    element: PropTypes.object,
    onDragMove: PropTypes.func,
    onTransform: PropTypes.func,
    layer: PropTypes.object,
    showHelper: PropTypes.bool,
    helperWidth: PropTypes.number,
    helperHeight: PropTypes.number
};

export default elementProps;
