import React from 'react';
import filter from '../graphics/filter.webp';

const FilterButton = (props) => {
    return (
        <button id="filterbutton" onClick={props.onClick}>
            <img src={filter} alt="filter and sort" />
        </button>
    )
}

export default FilterButton;
