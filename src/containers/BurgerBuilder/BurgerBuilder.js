import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary.js';
import {connect} from 'react-redux';

import Burger from '../../components/Burger/Burger.js';
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js';
import Modal from '../../components/UI/Modal/Modal.js';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummer.js';
import Spinner from '../../components/UI/Spinner/Spinner.js';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler.js';
import axiosInstance from '../../axios-orders.js';
import * as actionType from '../../store/action.js'



class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
//        axiosInstance.get('https://react-burgur-app.firebaseio.com/ingredients.json')
//        .then(response => {
//            this.setState({ingredients: response.data})
//        })
//        .catch(error => {
//            this.setState({error: true})
//        });
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
                    .map(igKey => {return ingredients[igKey];})
                    .reduce((sum, el) => {return sum + el},0 );
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
            this.props.history.push('/checkout');
    }


    render(){
        const disabledInfo = {...this.props.ings};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let ordersummery = null;
        if(this.state.loading){
            ordersummery = <Spinner />;
        }

        let burger = this.state.error? <p>can not load ingredients</p> :<Spinner />;
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients= {this.props.ings} />
                    <BuildControls ingredientAdded={this.props.onIngredientAdded} ingredientRemoved={this.props.onIngredientRemoved}
                    disabled = {disabledInfo} price={this.props.price} purchased={this.purchaseHandler} purchasable={this.updatePurchaseState(this.props.ings)}/>
                </Aux>
            );

            ordersummery = <OrderSummery totalPrice={this.props.price} ingredients={this.props.ings} continueOrder={this.purchaseContinueHandler} cancelOrder={this.purchaseCancelHandler}/>;
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {ordersummery}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProp = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProp = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionType.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionType.REMOVE_INGREDIENT, ingredientName: ingName})
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(withErrorHandler(BurgerBuilder, axiosInstance));