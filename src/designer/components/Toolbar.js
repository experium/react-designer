import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPlus, faFont, faCircle, faSquare, faQrcode, faImage, faBezierCurve } from '@fortawesome/free-solid-svg-icons';
import { find, propEq } from 'ramda';

const Container = styled.div`
    width: 40px;
`;

const IconWrapper = styled.div`
    color: ${({ hover }) => hover ? '#888' : 'rgb(181, 181, 181)'};
    background: ${({ hover }) => hover ? 'rgb(235, 235, 235)' : 'none'};
    transition: all .3s;
    height: 40px;
    width: 40px;
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background: rgb(235, 235, 235);
        color: #888;
        cursor: pointer;
    }
`;

const Elements = styled.div`
    background: rgb(235, 235, 235);
    border-top: 1px solid rgb(224, 224, 224);
    transition: all .3s;
    opacity: ${({ hover }) => hover ? 1 : 0};
    transform: scaleY(${({ hover }) => hover ? 1 : 0});
    transform-origin: center 0;
    overflow: hidden;
`;

const ELEMENTS = [
    { type: 'text', icon: faFont },
    { type: 'rect', icon: faSquare },
    { type: 'circle', icon: faCircle },
    { type: 'curve', icon: faBezierCurve },
    { type: 'image', icon: faImage },
    { type: 'qr', icon: faQrcode },
];

export default class Toolbar extends Component {
    static propTypes = {
        selected: PropTypes.string,
        onSelect: PropTypes.func
    };

    state = {
        hover: false
    };

    getSelectedIcon = () => {
        const { selected } = this.props;

        return selected ? find(propEq('type', selected), ELEMENTS).icon : null;
    }

    onMouseEnter = () => this.setState({ hover: true });

    onMouseLeave = () => this.setState({ hover: false });

    render() {
        const { onSelect } = this.props;
        const { hover } = this.state;

        return <Container>
            <IconWrapper onClick={() => onSelect(null)}>
                <FontAwesomeIcon icon={faCog} />
            </IconWrapper>
            <div onMouseLeave={this.onMouseLeave}>
                <IconWrapper onMouseEnter={this.onMouseEnter} hover={hover}>
                    <FontAwesomeIcon icon={this.getSelectedIcon() || faPlus} />
                </IconWrapper>
                <Elements hover={hover}>
                    { ELEMENTS.map(element =>
                        <IconWrapper key={element.type} onClick={() => onSelect(element.type)}>
                            <FontAwesomeIcon icon={element.icon} />
                        </IconWrapper>
                    )}
                </Elements>
            </div>
        </Container>;
    }
}
