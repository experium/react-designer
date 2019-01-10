export const WIDTH = 400;
export const HEIGHT = 500;

export const DEFAULT_SETTINGS = {
    rect: {
        type: 'rect',
        width: 100,
        height: 100,
        fill: '#2460A7',
        stroke: '#21366E',
        strokeWidth: 1,
        rotation: 0
    },
    circle: {
        type: 'circle',
        width: 100,
        height: 100,
        fill: 'rgba(106, 174, 170, 1)',
        stroke: 'rgba(37, 148, 144, 1)',
        strokeWidth: 1,
        rotation: 0
    },
    curve: {
        type: 'curve',
        width: 100,
        height: 100,
        fill: '#949CD0',
        stroke: '#491D70',
        strokeWidth: 1,
        rotation: 0,
        anchors: true,
        close: true
    },
    text: {
        type: 'text',
        fill: '#000000',
        stroke: 'rgba(0, 0, 0, 0)',
        strokeWidth: 0,
        text: 'Текст',
        rotation: 0,
        fontSize: 20,
        align: 'left',
        fontStyle: 'normal',
        fontFamily: 'Open Sans'
    },
    image: {
        type: 'image',
        rotation: 0,
        width: 150,
        height: 150
    },
    qr: {
        type: 'qr',
        fill: '#ffffff',
        width: 150,
        height: 150,
        rotation: 0
    }
};

export const TRANSFORM_SETTINGS = {
    curve: {
        resizeEnabled: false,
        rotateEnabled: false
    },
    text: {
        resizeEnabled: false
    },
    image: {
        enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
    },
    qr: {
        enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
    }
};
