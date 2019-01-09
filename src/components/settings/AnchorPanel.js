import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBezierCurve, faVectorSquare } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { assocPath, remove } from 'ramda';

import { Panel, PanelButton } from './StyledSettingsComponents';
import Row from './Row';
import AnchorsEditableContext from '../context/AnchorsEditableContext';
import CurrentContext from '../context/CurrentContext';

const TypeIcon = styled(FontAwesomeIcon)`
    margin-right: 10px;
    margin-bottom: 15px;
    cursor: pointer;
    transition: all .3s;
    &:hover {
        color: black;
    }
`;

export default class AnchorPanel extends Component {
    onChangeAnchorType = (onChangeProp, anchors, index, bezier) => {
        onChangeProp('anchors', assocPath([index, 'bezier'], bezier, anchors));
    }

    renderPanel = (currentAnchor, onRemoveCurrentAnchor, current, onChangeProp) => {
        const anchor = current.anchors[currentAnchor.index];

        return <Panel>
            <Row label='Тип'>
                <TypeIcon
                    icon={faBezierCurve}
                    color={anchor.bezier ? 'black' : 'rgb(181, 181, 181)'}
                    onClick={() => this.onChangeAnchorType(onChangeProp, current.anchors, currentAnchor.index, true)} />
                <TypeIcon
                    icon={faVectorSquare}
                    color={!anchor.bezier ? 'black' : 'rgb(181, 181, 181)'}
                    onClick={() => this.onChangeAnchorType(onChangeProp, current.anchors, currentAnchor.index)} />
            </Row>
            <PanelButton onClick={onRemoveCurrentAnchor}>
                Удалить опорную точку
            </PanelButton>
        </Panel>;
    }

    render() {
        return <AnchorsEditableContext.Consumer>
            { ({ currentAnchor, onRemoveCurrentAnchor }) =>
                <CurrentContext.Consumer>
                    { ({ current, onChangeProp }) =>
                        currentAnchor && this.renderPanel(currentAnchor, onRemoveCurrentAnchor, current, onChangeProp)
                    }
                </CurrentContext.Consumer>
            }
        </AnchorsEditableContext.Consumer>;
    }
}
