import React from 'react';
import BusImg from '../graphics/public-transit.png';
import ManImg from '../graphics/walking-man.png';

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
        const {img, address, nickname, beds,
               baths, sqft, rent, inUnit,
               transitPublic, transitFoot, details} = this.props;
        return (
            <div className="listing">
                <img src={img} alt={this.getImageAlt(address)} />
                <div className="info-row">
                    <p className="address">{address}</p>
                    <p>"{nickname}"</p>
                </div>
                <div className="info-row">
                    <p>{beds} Beds</p>
                    <p>{baths} Baths</p>
                    <p>{sqft} ft<sup>2</sup></p>
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
                        <img src={ManImg} alt="by foot" />
                        <p>{transitFoot} min</p>
                    </span>
                </div>
                <div className="info-row">
                    <p className="details">Additional info: {details}</p>
                </div>
            </div>
        )
    }
}

export default Listing;
