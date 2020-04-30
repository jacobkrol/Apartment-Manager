import React from 'react';
import removeImg from '../graphics/trash.png';

const RemoveButton = (props) => {
    return (
        <button onClick={props.onClick}>
            <img src={removeImg} alt="remove" />
        </button>
    )
}

export default RemoveButton;
