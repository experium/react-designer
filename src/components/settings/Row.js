import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
`;

const Column = styled.div`
    width: 50%;
`;

const Label = styled.span`
    color: gray;
    font-size: 11px;
`;

export default class Row extends Component {
    render() {
        const { label, children } = this.props;

        return <Container className='panel-row'>
            <Column>
                <Label>{ label }</Label>
            </Column>
            <Column>
                { children }
            </Column>
        </Container>;
    }
}
