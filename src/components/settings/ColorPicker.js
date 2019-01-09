import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ClickOutside from 'react-click-outside';
import { SketchPicker } from 'react-color'

import CurrentContext from '../context/CurrentContext';

const Container = styled.div`
    position: relative;
`;

const Swatch = styled.div`
    width: 18px;
    height: 18px;
    border: 2px solid #fff;
    background-color: ${({ color }) => color || '#fff'};
    border-radius: 50%;
    cursor: pointer;
`;

const PickerWrapper = styled.div`
    position: absolute;
    right: 16px;
    top: 20px;
`;

export default class ColorPicker extends Component {
    static propTypes = {
        prop: PropTypes.string
    };

    static defaultProps = {
        prop: 'fill'
    };

    state = {
        opened: false
    };

    toggle = () => this.setState(prev => ({ opened: !prev.opened }));

    close = () => this.setState({ opened: false });

    onChange = ({ rgb }, onChange) => {
        const { prop } = this.props;

        onChange(prop, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`);
    }

    renderPicker = ({ current, onChangeProp, onChangeSettingsProp, settings }) => {
        const { prop } = this.props;
        const { opened } = this.state;
        const item = current || settings;

        return <Container>
            <Swatch
                color={item[prop]} onClick={this.toggle} />
            { opened &&
                <PickerWrapper>
                    <ClickOutside onClickOutside={this.close}>
                        <SketchPicker
                            color={item[prop]}
                            onChange={color => this.onChange(color, current ? onChangeProp : onChangeSettingsProp)} />
                    </ClickOutside>
                </PickerWrapper>
            }
        </Container>;
    }

    render() {
        return <CurrentContext.Consumer>
            {this.renderPicker}
        </CurrentContext.Consumer>;
    }
}
