import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { contains, without, append, equals } from 'ramda';

import { Panel } from './StyledSettingsComponents';
import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';
import { FONTS } from '../../constants/fonts';
import { faAlignLeft, faAlignCenter, faAlignRight, faBold, faItalic, faUnderline, faStrikethrough } from '@fortawesome/free-solid-svg-icons';
import withCurrentContext from '../hocs/withCurrentContext';

const Row = styled.div`
    margin-bottom: 10px;
`;

const FontStyleRow = styled(Row)`
    display: flex;
    justify-content: space-between;
`;

const TextStyleIcon = styled(FontAwesomeIcon)`
    font-size: 12px;
    cursor: pointer;
    transition: all .3s;
    &:hover {
        color: black;
    }
    &:not(:last-of-type) {
        margin-right: 7px;
    }
`;

class TextPanel extends Component {
    static propTypes = {
        onChangeProp: PropTypes.func,
        current: PropTypes.object
    };

    onChangeAlign = align => {
        const { onChangeProp } = this.props;

        onChangeProp('align', align);
    }

    onChangeFontStyle = style => {
        const { current, onChangeProp } = this.props;
        const styles = (current.fontStyle || '').split(' ');
        let updated = contains(style, styles) ? without([style], styles) : append(style, styles);
        updated = !updated.length ?
            ['normal'] : contains('normal', updated) && updated.length > 1 ?
            without(['normal'], updated) : updated;

        onChangeProp('fontStyle', updated.join(' '));
    }

    onChangeTextDecoration = decoration => {
        const { current, onChangeProp } = this.props;
        const decorations = (current.textDecoration || '').split(' ');
        const updated = contains(decoration, decorations) ? without([decoration], decorations) : append(decoration, decorations);

        onChangeProp('textDecoration', updated.join(' '));
    }

    isAlignActive = v => equals(v, this.props.current.align);

    isFontStyleActive = v => contains(v, this.props.current.fontStyle || '');

    isTextDecorationActive = v => contains(v, this.props.current.textDecoration || '');

    stylesList = [
        { icon: faAlignLeft, value: 'left', onChange: this.onChangeAlign, isActive: this.isAlignActive },
        { icon: faAlignCenter, value: 'center', onChange: this.onChangeAlign, isActive: this.isAlignActive },
        { icon: faAlignRight, value: 'right', onChange: this.onChangeAlign, isActive: this.isAlignActive },
        { icon: faBold, value: 'bold', onChange: this.onChangeFontStyle, isActive: this.isFontStyleActive },
        { icon: faItalic, value: 'italic', onChange: this.onChangeFontStyle, isActive: this.isFontStyleActive },
        { icon: faUnderline, value: 'underline', onChange: this.onChangeTextDecoration, isActive: this.isTextDecorationActive },
        { icon: faStrikethrough, value: 'line-through', onChange: this.onChangeTextDecoration, isActive: this.isTextDecorationActive }
    ];

    renderTextStylePanel = () => {
        return <div>
            { this.stylesList.map(({ icon, value, onChange, isActive }) =>
                <TextStyleIcon
                    key={value}
                    color={isActive(value) ? 'black' : 'rgb(181, 181, 181)'}
                    icon={icon}
                    onClick={() => onChange(value)} />
            )}
        </div>;
    }

    render() {
        return <Panel>
            <FontStyleRow>
                <Input
                    prop='fontSize'
                    small='размер шрифта'
                    isNumber />
                { this.renderTextStylePanel() }
            </FontStyleRow>
            <Row>
                <Select
                    small='выберите шрифт'
                    prop='fontFamily'
                    options={FONTS} />
            </Row>
            <Textarea prop='text' />
        </Panel>;
    }
}

export default withCurrentContext(TextPanel);
