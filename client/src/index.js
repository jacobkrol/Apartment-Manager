import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const listings = [
    {
        "id": 0,
        "address": "719 S Loomis St Apt 2",
        "nickname": "Zaib House",
        "img": "https://photos.zillowstatic.com/uncropped_scaled_within_1536_1152/ISq1ehop8o8pi90000000000.webp",
        "rent": 2400,
        "sqft": 1400,
        "beds": 4,
        "baths": 1.0,
        "inUnit": false,
        "transitPublic": 10,
        "transitFoot": 20,
        "details": "blackboard wall"
    }
];

ReactDOM.render(
  <React.StrictMode>
    <App listings={listings} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
