import React from 'react';
import EditButton from './EditButton.js';
import LikeButton from './LikeButton.js';
import RemoveButton from './RemoveButton.js';
import BusImg from '../graphics/public-transit.png';
import WalkImg from '../graphics/walking-man.png';
import PhoneImg from '../graphics/phone.png';
import LikeFilledImg from '../graphics/star-filled-2.png';

class Listing extends React.Component {
    state = {
        likes: this.props.likes
    }

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

    onClick = (type, id, address) => {
        const url = 'https://zoommates.herokuapp.com/api/'+type;
        console.log(type,"requested");
        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }

        switch(type) {
            case 'like':
                requestOptions['body'] = JSON.stringify({id:id});
                fetch(url,requestOptions)
                    .then(res => res.status === 200
                        ? this.setState(prevState => {return {likes: prevState.likes+1}})
                        : alert("An error occurred while recording your like.\nHTTP Status No.",res.status)
                    )
                    .catch(err => {
                        console.log(err);
                    });
                break;

            case 'remove':
                const verify = window.confirm("Are you sure you want to remove the listing at "+address+"?");
                if(!verify) break;
                requestOptions['body'] = JSON.stringify({id:id,removedreason:"no reason provided"});
                fetch(url,requestOptions)
                    .then(res => res.redirectTo
                        ? window.location = res.redirectTo
                        : alert("An error occurred while removing the listing.\nPlease try again later.")
                    )
                    .catch(err => {
                        console.log(err);
                    });
                break;

            default:
                console.log("Unrecognized type",type);
                break;
        }

    }

    render() {
        const {id, img, link, address, nickname, beds,
               baths, sqft, rent, inUnit, transitPublic,
               transitFoot, details, contacted} = this.props;
        return (
            <div className="listing-outer">
                <div className="listing-tabs-row">
                    <div className="listing-tab">
                        <LikeButton id={id} onClick={(id) => this.onClick("like",id,"")} />
                    </div>
                    <div className="listing-tab">
                        <EditButton onClick={() => console.log("edit click")} />
                    </div>
                    <div className="listing-tab">
                        <RemoveButton id={id} address={address} onClick={(id) => this.onClick("remove",id, address)} />
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
                    {this.state.likes > 0
                        ?
                        <div className="info-row">
                            {[...Array(this.state.likes)].map((e,i) => <img src={LikeFilledImg} alt="like" className="star-filled" key={i} />)}
                        </div>
                        :
                        <span style={{margin:0}}></span>
                    }

                    <div className="info-row">
                        <p className="details">Additional info: {details ? details : "none"}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Listing;
