import React from 'react';
import Listing from './components/Listing.js';
import AddButton from './components/AddButton.js';
import Add from './components/Add.js';
import FilterButton from './components/FilterButton.js';
import Filter from './components/Filter.js';

class App extends React.Component {
    state = {
        data: [],
        loading: false,
        adding: false,
        filtering: false,
        message: "Loading data. Please wait..."
    }

    componentDidMount() {
        this.setState({loading: true})
        fetch('http://localhost:5000/api/active')//'https://zoommates.herokuapp.com/api/active')
            .then(res => res.json())
            .then(data => {
                this.setState({data, loading: false});
                data.length ? this.setState({message: "Success"}) : this.setState({message: "No results found."});
            })
            .catch(err => {
                console.log(err);
                this.setState({message: "An error has occurred accessing the data. Please try again later."});
            });
    }

    handleClickAdd() {
        this.setState({adding: true});
        document.getElementById("add-parent").style.visibility = "visible";
    }

    handleClickCancel() {
        this.setState({adding: false});
        document.getElementById("add-parent").style.visibility = "hidden";
        this.setState({filtering: false});
        document.getElementById("filter-parent").style.visibility = "hidden";
    }

    handleClickFilter() {
        this.setState({filtering: true});
        document.getElementById("filter-parent").style.visibility = "visible";
    }

    render() {
        return (
            <section>
                <Add onClick={() => this.handleClickCancel()} />
                <Filter onClick={() => this.handleClickCancel()} />
                <FilterButton onClick={() => this.handleClickFilter()} />
                <AddButton onClick={() => this.handleClickAdd()} />
                <div id="listing-container">
                    {this.state.loading
                        ?
                        <h2>{this.state.message}</h2>
                        :
                        this.state.data.map(
                            listing => <Listing
                                key={listing.id}
                                link={listing.link}
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
            </section>
        )
    }
}

export default App;
