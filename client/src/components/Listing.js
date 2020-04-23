import React from 'react';
import BusImg from '../graphics/public-transit.png';
import WalkImg from '../graphics/walking-man.png';

class Listing extends React.Component {

    getPerPerson = rent => {
        return Math.round(100*rent/4)/100;
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
               baths, sqft, rent, inUnit,
               transitPublic, transitFoot, details} = this.props;
        return (
            <div className="listing">
                <img src={img} alt={this.getImageAlt(address)} />
                <div className="info-row">
                    <a href={link} target="_blank" rel="noopener noreferrer" className="address">{address}</a>
                    {nickname ? <p>"{nickname}"</p> : <span style={{margin: 0}}></span>}
                </div>
                <div className="info-row">
                    <p>{beds} Beds</p>
                    <p>{Math.trunc(baths) == baths ? Math.trunc(baths) : baths} {baths > 1 ? "Baths" : "Bath"}</p>
                    <p>{sqft > 0 ? sqft : "Unknown"} ft<sup>2</sup></p>
                    <p style={{color: this.getInUnitColor(inUnit)}}>{this.getInUnitPhrase(inUnit)}In-Unit</p>
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
        )
    }
}

export default Listing;
