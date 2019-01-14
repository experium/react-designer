import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { faDotCircle, faArrowAltCircleUp, faArrowAltCircleRight, faArrowAltCircleDown, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Row = styled.div`
    display: flex;
`;

const Button = styled.div`
    & > svg {
        transform: rotate(${({ angle }) => angle || 0}deg);
        color: ${({ active }) => active ? 'black' : 'rgb(181, 181, 181)'};
        cursor: pointer;
        transition: all .3s;
        &:hover {
            color: black;
        }
    }
`;

const buttons = [
    [
        { type: 'topleft', icon: faArrowAltCircleUp, angle: -45 },
        { type: 'top', icon: faArrowAltCircleUp },
        { type: 'topright', icon: faArrowAltCircleUp, angle: 45 }
    ],
    [
        { type: 'left', icon: faArrowAltCircleLeft },
        { type: 'center', icon: faDotCircle },
        { type: 'right', icon: faArrowAltCircleRight }
    ],
    [
        { type: 'bottomleft', icon: faArrowAltCircleDown, angle: 45 },
        { type: 'bottom', icon: faArrowAltCircleDown },
        { type: 'bottomright', icon: faArrowAltCircleDown, angle: -45 }
    ]
];

export default class BackgroundAlignToggler extends Component {
    static propTypes = {
        align: PropTypes.string,
        onChange: PropTypes.func
    };

    static defaultProps = {
        align: 'center'
    };

    onChange = type => {
        this.props.onChange('backgroundAlign', type);
    }

    render() {
        const { align } = this.props;

        return <div>
            { buttons.map((row, index) =>
                <Row key={`background-align-row-${index}`}>
                    { row.map(button =>
                        <Button
                            key={button.type}
                            angle={button.angle}
                            active={button.type === align}
                            onClick={() => this.onChange(button.type)}>
                            <FontAwesomeIcon icon={button.icon} />
                        </Button>
                    )}
                </Row>
            )}
        </div>;
    }
}
