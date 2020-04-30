import React from 'react';
import EditButton from './EditButton.js';
import LikeButton from './LikeButton.js';
import RemoveButton from './RemoveButton.js';
import BusImg from '../graphics/public-transit.png';
import WalkImg from '../graphics/walking-man.png';
import PhoneImg from '../graphics/phone.png';

class Listing extends React.Component {

    getPerPerson = rent => {
        const value = Math.round(100*rent/4)/100;
        return Math.trunc(value) < value ? value.toFixed(2) : value;
    }

    getImageAlt = address => {
        return "image of " + address;
    }

    getInUnitColor = inUnit => {
        return inUnit ? "#2A2" : "#A22";
    }

    getInUnitPhrase = inUnit => {
        return inUnit ? "" : "No ";
    }

    render() {
        const {img, link, address, nickname, beds,
               baths, sqft, rent, inUnit, transitPublic,
               transitFoot, details, contacted} = this.props;
        return (
            <div className="listing-outer">
                <div className="listing-tabs-row">
                    <div className="listing-tab">
                        <LikeButton onClick={() => console.log("edit click")} />
                    </div>
                    <div className="listing-tab">
                        <EditButton onClick={() => console.log("edit click")} />
                    </div>
                    <div className="listing-tab">
                        <RemoveButton onClick={() => console.log("edit click")} />
                    </div>
                </div>
                <div className="listing">
                    <img src={img} alt={this.getImageAlt(address)} />
                    <div className="info-row">
                        <a href={link} target="_blank" rel="noopener noreferrer" className="address">{address}</a>
                        {nickname ? <p>"{nickname}"</p> : <span style={{margin: 0}}></span>}
                    </div>
                    <div className="info-row">
                        <p>{beds} Beds</p>
                        <p>{Math.trunc(baths) < baths ? baths : Math.trunc(baths)} {baths > 1 ? "Baths" : "Bath"}</p>
                        <p>{sqft > 0 ? sqft : "Unknown"} ft<sup>2</sup></p>
                        <p style={{color: this.getInUnitColor(inUnit)}}>{this.getInUnitPhrase(inUnit)}In-Unit</p>
                        {contacted ? <img src={PhoneImg} alt="phone" /> : <span style={{margin: 0}}></span>}
                    </div>
                    <div className="info-row">
                        <p><span className="rent">${this.getPerPerson(rent)}</span> per person, per month</p>
                    </div>
                    <div className="info-row">
                        <span>
                            <img src={BusImg} alt="by cta" />
                            <p>{transitPublic} min</p>
                        </span>
                        <span>
                            <img src={WalkImg} alt="by foot" />
                            <p>{transitFoot} min</p>
                        </span>
                    </div>
                    <div className="info-row">
                        <p className="details">Additional info: {details ? details : "none"}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Listing;
