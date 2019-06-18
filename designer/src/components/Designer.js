import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { find, propEq, pathOr, path, findIndex, update, remove, prop, assoc, contains } from 'ramda';
import uniqid from 'uniqid';
import ClickOutside from 'react-click-outside';

import Toolbar from './Toolbar';
import Canvas from './Canvas';
import SettingsPanel from './settings/SettingsPanel';
import { DEFAULT_SETTINGS, WIDTH, HEIGHT } from '../constants/settings';
import CurrentContext from './context/CurrentContext';
import OrderContext from './context/OrderContext';
import AnchorsEditableContext from './context/AnchorsEditableContext';

const Container = styled.div`
    * {
        box-sizing: border-box;
    }
    font-family: 'Lucida Grande', sans-serif;
    display: inline-flex;
`;

const CanvasWrapper = styled.div`
    margin-right: 15px;
    border: 1px solid #eee;
    width: ${prop('width')}px;
    height: ${prop('height')}px;
    overflow: hidden;
`;

const Wrapper = styled.div`
    display: inline-block;
`;

export default class Designer extends Component {
    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        data: PropTypes.shape({
            elements: PropTypes.arrayOf(PropTypes.object),
            settings: PropTypes.object
        }),
        getStageRef: PropTypes.func
    };

    static defaultProps = {
        data: {},
        width: WIDTH,
        height: HEIGHT
    };

    state = {
        selectedType: null,
        current: null,
        anchorsEditable: false,
        currentAnchor: null
    };

    componentDidMount() {
        window.addEventListener('keydown', this.onKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown);
    }

    onKeyDown = e => {
        const { current, currentAnchor } = this.state;

        if (contains(e.target.tagName, ['TEXTAREA', 'INPUT'])) {
            return;
        }

        switch (e.keyCode) {
            case 8:
                if (currentAnchor) {
                    this.onRemoveCurrentAnchor();
                } else if (current) {
                    this.onRemoveCurrent();
                }
                break;
            case 37:
                this.moveCurrentToX(e, true);
                break;
            case 38:
                this.moveCurrentToY(e, true);
                break;
            case 39:
                this.moveCurrentToX(e);
                break;
            case 40:
                this.moveCurrentToY(e);
                break;
            default:
        }
    }

    moveCurrentToX = (e, left) => {
        e.preventDefault();
        const current = this.getCurrentElement();
        const x = current.x + (left ? -1 : 1);


        this.onChangeCurrentElement({
            ...current,
            x,
            ...(current.anchors ?
                { anchors: current.anchors.map(a => assoc('x', a.x + (left ? -1 : 1), a)) } :
                {}
            )
        });
    }

    moveCurrentToY = (e, top) => {
        e.preventDefault();
        const current = this.getCurrentElement();
        const y = current.y + (top ? -1 : 1);

        this.onChangeCurrentElement({
            ...current,
            y,
            ...(current.anchors ?
                { anchors: current.anchors.map(a => assoc('y', a.y + (top ? -1 : 1), a)) } :
                {}
            )
        });
    }

    onSelectType = selectedType => this.setState({
        selectedType,
        current: null,
        anchorsEditable: false,
        currentAnchor: null
    });

    onChangeCurrent = current => this.setState(prev => {
        const allowResetAnchors = current && prev.current === current;

        return {
            current,
            anchorsEditable: allowResetAnchors ? prev.anchorsEditable : false,
            currentAnchor: allowResetAnchors ? prev.currentAnchor : null
        };
    });

    onChangeAnchorsEditable = anchorsEditable => this.setState({ anchorsEditable });

    getElements = () => {
        return pathOr([], ['data', 'elements'], this.props);
    }

    getSettings = () => {
        return pathOr({}, ['data', 'settings'], this.props);
    }

    getCurrentElement = () => {
        const { current } = this.state;

        return find(propEq('name', current), this.getElements());
    }

    onChangeElements = elements => {
        const { onChange, data } = this.props;

        onChange({ ...data, elements });
    }

    onChangeSettings = settings => {
        const { onChange, data } = this.props;

        onChange({ ...data, settings });
    }

    onAddElement = (x, y) => {
        const { selectedType } = this.state;
        const name = uniqid();
        const defaultSettings = DEFAULT_SETTINGS[selectedType];

        this.onChangeElements([
            ...this.getElements(),
            {
                ...defaultSettings,
                name,
                x,
                y,
                ...(defaultSettings.anchors ? { anchors: [{ x, y, bezier: false }] } : {})
            }
        ]);
        this.setState({
            selectedType: null,
            current: name,
            anchorsEditable: !!defaultSettings.anchors,
            currentAnchor: defaultSettings.anchors ? { name, index: 0 } : null
        });
    }

    onChangeCurrentElement = element => {
        const elements = this.getElements();

        this.onChangeElements(
            update(findIndex(propEq('name', element.name), elements), element, elements)
        );
    }

    onChangeCurrentProp = (prop, value) => {
        const element = {
            ...this.getCurrentElement(),
            [prop]: value
        };

        this.onChangeCurrentElement(element);
    }

    onChangeSettingsProp = (prop, value) => {
        const settings = {
            ...this.getSettings(),
            [prop]: value
        };

        this.onChangeSettings(settings);
    }

    onRemoveCurrent = () => {
        const { current } = this.state;
        const elements = this.getElements();

        this.onChangeElements(
            remove(findIndex(propEq('name', current), elements), 1, elements)
        );
        this.setState({ current: null, anchorsEditable: false, currentAnchor: null });
    }

    onChangeOrder = (back, once) => {
        const { current } = this.state;
        const elements = this.getElements();
        const startIndex = findIndex(propEq('name', current), elements);
        const endIndex = once ?
            (back ?
                (startIndex - 1 < 0 ? 0 : startIndex - 1) :
                (startIndex + 1 > elements.length ? elements.length : startIndex + 1)
            ) :
            (back ? 0 : elements.length);
        const result = Array.from(elements);
        const [ removed ] = result.splice(startIndex, 1);

        result.splice(endIndex, 0, removed);

        this.onChangeElements(result);
    }

    onAddAnchor = (x, y) => {
        const current = this.getCurrentElement();
        const anchors = [...current.anchors, { x, y, bezier: false }];

        this.onChangeCurrentProp('anchors', anchors);
        this.setState({ currentAnchor:
            { name: current.name, index: anchors.length - 1 }
        });
    }

    onChangeCurrentAnchor = (name, index) => this.setState({
        currentAnchor: { name, index }
    });

    onRemoveCurrentAnchor = () => {
        const { currentAnchor } = this.state;
        const current = this.getCurrentElement();

        this.setState({ currentAnchor: null });
        this.onChangeCurrentProp('anchors', remove(currentAnchor.index, 1, current.anchors));
    }

    detachElement = () => {
        if (this.transformer) {
            this.transformer.detach();
            this.transformer.getLayer().batchDraw();
        }
    };

    render() {
        const { width, height, getStageRef } = this.props;
        const { selectedType, anchorsEditable, currentAnchor } = this.state;
        const elements = this.getElements();
        const currentElement = this.getCurrentElement();

        return <Wrapper>
            <ClickOutside onClickOutside={this.detachElement}>
                <CurrentContext.Provider value={{
                    current: currentElement,
                    onChangeProp: this.onChangeCurrentProp,
                    onChange: this.onChangeCurrentElement,
                    onRemove: this.onRemoveCurrent,
                    settings: this.getSettings(),
                    onChangeSettingsProp: this.onChangeSettingsProp,
                    onChangeSettings: this.onChangeSettings
                }}>
                    <OrderContext.Provider value={{
                        onChangeOrder: this.onChangeOrder
                    }}>
                            <Container>
                                <Toolbar
                                    selected={selectedType}
                                    onSelect={this.onSelectType} />
                                <CanvasWrapper width={width} height={height}>
                                    <Canvas
                                        elements={elements}
                                        current={currentElement}
                                        onChangeCurrentElement={this.onChangeCurrentElement}
                                        onChangeCurrentProp={this.onChangeCurrentProp}
                                        selectedType={selectedType}
                                        onChangeCurrent={this.onChangeCurrent}
                                        onAddElement={this.onAddElement}
                                        onAddAnchor={this.onAddAnchor}
                                        onChangeCurrentAnchor={this.onChangeCurrentAnchor}
                                        currentAnchor={currentAnchor}
                                        width={width}
                                        height={height}
                                        settings={this.getSettings()}
                                        anchorsEditable={anchorsEditable}
                                        getTransformerRef={node => this.transformer = node}
                                        getStageRef={getStageRef} />
                                </CanvasWrapper>
                                <AnchorsEditableContext.Provider value={{
                                    editable: anchorsEditable,
                                    onChangeEditable: this.onChangeAnchorsEditable,
                                    onRemoveCurrentAnchor: this.onRemoveCurrentAnchor,
                                    currentAnchor
                                }}>
                                    <SettingsPanel type={path(['type'], currentElement)} />
                                </AnchorsEditableContext.Provider>
                            </Container>
                    </OrderContext.Provider>
                </CurrentContext.Provider>
            </ClickOutside>
        </Wrapper>;
    }
}
