import React from 'react';
import editImg from '../graphics/edit.webp';

const EditButton = (props) => {
    return (
        <button onClick={props.onClick}>
            <img src={editImg} alt="edit" />
        </button>
    )
}

export default EditButton;
