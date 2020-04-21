import React from 'react';
import Listing from './components/Listing.js';

class App extends React.Component {
    state = {
        data: [],
        loading: false
    }

    componentDidMount() {
        this.setState({loading: true})
        fetch('http://localhost:5000/api')
            .then(res => res.json())
            .then(data => this.setState({data, loading: false}))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div id="listing-container">
                {this.state.loading
                    ?
                    <h2>Loading data. Please wait...</h2>
                    :
                    this.state.data.map(
                        listing => <Listing
                            key={listing.id}
                            address={listing.address}
                            nickname={listing.nickname}
                            img={listing.img}
                            rent={listing.rent}
                            sqft={listing.sqft}
                            beds={listing.beds}
                            baths={listing.baths}
                            inUnit={listing.inunit}
                            transitPublic={listing.transitpublic}
                            transitFoot={listing.transitfoot}
                            details={listing.details}
                        />
                    )
                }
            </div>
        )
    }
}

export default App;
