import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { head, props } from 'ramda';

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
        removable: PropTypes.bool,
        postFileUrl: PropTypes.string
    };

    state = {
        error: false
    };

    onLoad = (e, fn) => {
        const { prop, postFileUrl } = this.props;
        const file = head(e.target.files);

        if (file) {
            if (postFileUrl) {
                let formData = new FormData();

                formData.append('file', file);
                fetch(postFileUrl, { method: 'POST', body: formData })
                    .then(res => res.json())
                    .then(({ id }) => fn(prop, id))
                    .catch(() => {
                        this.setState({ error: true });
                        setTimeout(() => this.setState({ error: false }), 10000);
                    });
            } else {
                const reader = new FileReader();

                reader.readAsDataURL(file);
                reader.onload = () => fn(prop, reader.result);
            }
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
        return <Fragment>
            <CurrentContext.Consumer>
                { this.renderLoader }
            </CurrentContext.Consumer>
            { this.state.error &&
                <div
                    style={{
                        position: 'fixed',
                        top: 15,
                        right: 15,
                        fontSize: 14,
                        background: '#fff',
                        fontFamily: 'Arial',
                        padding: 15,
                        zIndex: 1000,
                        boxShadow: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)'
                    }}>
                    Не удалось загрузить файл
                </div>
            }
        </Fragment>;
    }
}
