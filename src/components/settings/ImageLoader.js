import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { head } from 'ramda';

import { PanelButton } from './StyledSettingsComponents';
import CurrentContext from '../context/CurrentContext';

const FileInput = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor:pointer;
    ::-webkit-file-upload-button {
        cursor:pointer;
    }
`;

export default class ImageLoader extends Component {
    static propTypes = {
        prop: PropTypes.string,
        removable: PropTypes.bool
    };

    reader = new FileReader();

    onLoad = (e, fn) => {
        const { prop } = this.props;
        const file = head(e.target.files);

        if (file) {
            this.reader.readAsDataURL(file);
            this.reader.onload = () => fn(prop, this.reader.result);
        }
    }

    renderLoader = ({ current, settings, onChangeProp, onChangeSettingsProp }) => {
        const { prop, removable } = this.props;
        const item = current || settings;
        const fn = current ? onChangeProp : onChangeSettingsProp;

        return item[prop] && removable ?
            <PanelButton onClick={() => fn(prop, null)}>
                Удалить
            </PanelButton> :
            <PanelButton>
                Загрузить
                <FileInput
                    type='file'
                    accept='image/*'
                    onChange={e => this.onLoad(e, fn)} />
            </PanelButton>;
    }

    render() {
        return <CurrentContext.Consumer>
            { this.renderLoader }
        </CurrentContext.Consumer>;
    }
}
