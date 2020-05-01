import React from 'react';
import likeImg from '../graphics/star.png';

const LikeButton = (props) => {
    return (
        <button onClick={() => {props.onClick(props.id)}}>
            <img src={likeImg} alt="like" />
        </button>
    )
}

export default LikeButton;
