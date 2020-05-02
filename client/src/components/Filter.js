import React from 'react';

class Filter extends React.Component {

    newMessage = e => {
        document.getElementById("inunit-filter-message").innerText = document.getElementById("inunit-filter-checkbox").checked ? "Required" : "No preference";
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(document.getElementById("filter-form"));
    }

    render() {
        return (
            <div id="filter-parent">
                <div id="filter-outer">
                    <div id="filter-inner">
                        <h2>Sort and Filter Listings</h2>
                        <form
                            id="filter-form"
                            onSubmit={this.onSubmit}
                        >

                            <label>Sort by:&nbsp;
                                <select name="sort-by">
                                    <option value="newest">Newest Uploads</option>
                                    <option value="popularity">Popularity</option>
                                    <option value="rent-lh">Rent Price - Low to High</option>
                                    <option value="rent-hl">Rent Price - High to Low</option>
                                    <option value="sqft-lh">Square Feet - Low to High</option>
                                    <option value="sqft-hl">Square Feet - High to Low</option>
                                    <option value="cta-lh">Public Transit - Low to High</option>
                                    <option value="cta-hl">Public Transit - High to Low</option>
                                    <option value="foot-lh">Walking Distance - Low to High</option>
                                    <option value="foot-hl">Walking Distance - High to Low</option>
                                </select>
                            </label>

                            <label>Number of Beds:&nbsp;
                                <select name="beds">
                                    <option value="">No preference</option>
                                    <option value="3">3+</option>
                                    <option value="4">4+</option>
                                </select>
                            </label>

                            <label>Number of Baths:&nbsp;
                                <select name="baths">
                                    <option value="">No preference</option>
                                    <option value="1">1+</option>
                                    <option value="1.5">1.5+</option>
                                    <option value="2">2+</option>
                                    <option value="2.5">2.5+</option>
                                    <option value="3">3+</option>
                                </select>
                            </label>

                            <label>In-Unit?&nbsp;
                                <input id="inunit-filter-checkbox" type="checkbox" name="inunit" onChange={this.newMessage} />&nbsp;
                                <span id="inunit-filter-message">No preference</span>
                            </label>

                            <label>
                                <div className="radio-column">
                                    <p><input type="radio" name="contacted" value="true" />Contacted</p>
                                    <p><input type="radio" name="contacted" value="false" />Not Contacted</p>
                                    <p><input type="radio" name="contacted" value="all" defaultChecked />All Listings</p>
                                </div>
                            </label>

                            <label>Rent:</label>
                            <input type="number" className="linked-input" name="rent-min" placeholder="min" min="0" max="9999" />
                            <input type="number" className="linked-input" name="rent-max" placeholder="max" min="0" max="9999" />

                            <label>Square feet:</label>
                            <input type="number" className="linked-input" name="sqft-min" placeholder="min" min="0" max="9999" />
                            <input type="number" className="linked-input" name="sqft-max" placeholder="max" min="0" max="9999" />

                            <label>Public Transit:</label>
                            <input type="number" className="linked-input" name="cta-min" placeholder="min" min="0" max="99" />
                            <input type="number" className="linked-input" name="cta-max" placeholder="max" min="0" max="99" />

                            <label>Walking Distance:</label>
                            <input type="number" className="linked-input" name="foot-min" placeholder="min" min="0" max="99" />
                            <input type="number" className="linked-input" name="foot-max" placeholder="max" min="0" max="99" />

                            <input type="submit" />
                            <input type="button" value="Cancel" onClick={() => this.props.onClick()} />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Filter;
