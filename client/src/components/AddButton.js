import React from 'react';
import darkPlus from '../graphics/dark-plus-icon.png';

class AddButton extends React.Component {
    render() {
        return (
            <button id="addbutton">
                <img src={darkPlus} alt="add a link" />
            </button>
        )
    }
}

export default AddButton;
