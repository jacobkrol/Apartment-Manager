import React from 'react';
import Listing from './components/Listing.js';
import AddButton from './components/AddButton.js';
import Add from './components/Add.js';
import FilterButton from './components/FilterButton.js';
import Filter from './components/Filter.js';
import Message from './components/Message.js';

class App extends React.Component {
    state = {
        filterParams: {},
        data: [],
        loading: false,
        adding: false,
        filtering: false,
        message: "Loading data. Please wait..."
    }

    componentDidMount() {
        this.refreshListingData();
    }

    refreshListingData() {
        this.setState({loading: true, message: "Loading data. Please wait..."});
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.filterParams)
        };
        fetch('https://zoommates.herokuapp.com/api/filter',requestOptions)
            .then(res => res.json())
            .then(data => {
                this.setState({data, loading: false, message: "Showing "+data.length+" listings"});
            })
            .catch(err => {
                console.log(err);
                this.setState({message: "An error has occurred accessing the data. Please try again later."});
            });
        return true;
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

    isValidElement = e => e.value && e.name;

    isValidValue = e => !['checkbox','radio'].includes(e.type) || e.checked;

    formToJSON = elements => [].reduce.call(elements, (data, e) => {
        if(this.isValidElement(e) && this.isValidValue(e)) data[e.name] = e.value;
        return data;
    }, {});

    handleFilterSubmit = async (form) => {
        this.setState({filtering: false});
        document.getElementById("filter-parent").style.visibility = "hidden";
        let data = this.formToJSON(form.elements);
        if(data['rent-min']) data['rent-min'] *= 4;
        if(data['rent-max']) data['rent-max'] *= 4;
        await this.setState({filterParams: data});
        await this.refreshListingData();
    }

    render() {
        return (
            <section>
                <Add onClick={() => this.handleClickCancel()} />
                <Filter onClick={() => this.handleClickCancel()} onSubmit={(f) => this.handleFilterSubmit(f)} />
                <FilterButton onClick={() => this.handleClickFilter()} />
                <AddButton onClick={() => this.handleClickAdd()} />
                <div id="listing-container">
                    <Message msg={this.state.message} />
                    {this.state.loading
                        ?
                        <div></div>
                        :
                        this.state.data.map(
                            listing => <Listing
                                key={listing.id}
                                id={listing.id}
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
                                contacted={listing.contacted}
                                likes={listing.likes}
                            />
                        )
                    }
                </div>
            </section>
        )
    }
}

export default App;
