import React from 'react';

class Add extends React.Component {
    render() {
        return (
            <div id="add-parent">
                <div id="add-outer">
                    <div id="add-inner">
                        <h2>Add a Listing</h2>
                        <form>
                            <label className="required">Required field</label>
                            <label><span className="required">Link:</span>&nbsp;
                                <input type="text" name="link" placeholder="https://www.zillow.com/..." />
                            </label>
                            <label><span className="required">Address:</span>&nbsp;
                                <input type="text" name="address" placeholder="719 S Loomis St Apt 2" />
                            </label>
                            <label>Nickname:&nbsp;
                                <input type="text" name="nickname" placeholder="Zaib House" />
                            </label>
                            <label><span className="required">Rent:</span>&nbsp;
                                <input type="text" name="rent" placeholder="2400" />
                            </label>
                            <label><span className="required">Beds:</span>&nbsp;
                                <input type="text" name="beds" placeholder="4" />
                            </label>
                            <label><span className="required">Baths:</span>&nbsp;
                                <input type="text" name="baths" placeholder="1" />
                            </label>
                            <label>In-Unit?&nbsp;
                                <input type="checkbox" name="inunit" />&nbsp;
                                <span id="input-inunit-message"></span>
                            </label>
                            <label>CTA commute:&nbsp;
                                <input type="number" name="transitpublic" placeholder="10" />
                            </label>
                            <label>Walking commute:&nbsp;
                                <input type="number" name="transitfoot" placeholder="20" />
                            </label>
                            <label>Additional details:&nbsp;
                                <input type="text" name="details" placeholder="blackboard wall" />
                            </label>
                            <input type="submit" />
                            <input type="button" value="Cancel" />

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Add;
