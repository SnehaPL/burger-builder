import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummery/CheckoutSummery.js';
import ContactData from './ContactData/ContactData.js';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route path={this.props.match.url + "/contact-data"} component={ContactData} />
            </div>
        );
    }
}

const mapStateToProp = state => {
    return {
        ings: state.ingredients
    };
};

export default connect(mapStateToProp)(Checkout);