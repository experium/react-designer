import React, { Component } from 'react';
import styled from 'styled-components';

import { Panel } from './StyledSettingsComponents';
import Row from './Row';
import OrderContext from '../context/OrderContext';

const Item = styled.div`
    color: rgb(81, 81, 81);
    font-size: 11px;
    transition: all .3s;
    cursor: pointer;
    margin-bottom: 3px;
    display: flex;
    align-items: center;
    &:hover {
        color: #000;
    }
    svg {
        margin-right: 5px;
    }
`;

const DoubleUp = () => <svg width={15} height={15}>
    <g>
        <rect x={5} y={5} width={9} height={9} fill='white' strokeWidth={1} stroke='black' />
        <rect x={3} y={3} width={9} height={9} fill='white' strokeWidth={1} stroke='black' />
        <rect x={1} y={1} width={9} height={9} fill='#ababab' stroke='black' strokeWidth={1} />
    </g>
</svg>;

const DoubleDown = () => <svg width={15} height={15}>
    <g>
        <rect x={5} y={5} width={9} height={9} fill='#ababab' strokeWidth={1} stroke='black' />
        <rect x={3} y={3} width={9} height={9} fill='white' strokeWidth={1} stroke='black' />
        <rect x={1} y={1} width={9} height={9} fill='white' stroke='black' strokeWidth={1} />
    </g>
</svg>;

const Up = () => <svg width={15} height={15}>
    <g>
        <rect x={5} y={5} width={9} height={9} fill='white' strokeWidth={1} stroke='black' />
        <rect x={1} y={1} width={9} height={9} fill='#ababab' stroke='black' strokeWidth={1} />
    </g>
</svg>;

const Down = () => <svg width={15} height={15}>
    <g>
        <rect x={5} y={5} width={9} height={9} fill='#ababab' strokeWidth={1} stroke='black' />
        <rect x={1} y={1} width={9} height={9} fill='white' stroke='black' strokeWidth={1} />
    </g>
</svg>;

export default class OrderPanel extends Component {
    render() {
        return <Panel>
            <OrderContext.Consumer>
                { ({ onChangeOrder }) =>
                    <Row label='Порядок'>
                        <Item onClick={() => onChangeOrder()}>
                            <DoubleUp /> На передний план
                        </Item>
                        <Item onClick={() => onChangeOrder(true)}>
                            <DoubleDown /> На задний план
                        </Item>
                        <Item onClick={() => onChangeOrder(false, true)}>
                            <Up /> Переложить вперед
                        </Item>
                        <Item onClick={() => onChangeOrder(true, true)}>
                            <Down /> Переложить назад
                        </Item>
                    </Row>
                }
            </OrderContext.Consumer>
        </Panel>;
    }
}
