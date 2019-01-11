import styled from 'styled-components';

export const Panel = styled.div`
    width: 300px;
    background: rgb(241, 241, 241);
    padding: 15px;
    margin-bottom: 10px;
    & > .panel-row:not(:last-of-type) {
        margin-bottom: 10px;
    }
`;

export const PanelButton = styled.button`
    padding: 3px 20px;
    border: 1px solid gray;
    color: darkslategray;
    background: rgb(241, 241, 241);
    border-radius: 3px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    outline: none;
    font-size: 11px;
`;

export const Small = styled.div`
    font-size: 9px;
    color: gray;
    padding-top: 2px;
`;
