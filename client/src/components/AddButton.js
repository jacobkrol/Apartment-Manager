import React from 'react';
import darkPlus from '../graphics/dark-plus-icon.png';

const AddButton = (props) => {
    return (
        <button id="addbutton" onClick={props.onClick}>
            <img src={darkPlus} alt="add a link" />
        </button>
    )
}

export default AddButton;
