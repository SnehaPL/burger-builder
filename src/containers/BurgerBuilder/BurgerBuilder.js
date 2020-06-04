import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary.js';

import Burger from '../../components/Burger/Burger.js';
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js';
import Modal from '../../components/UI/Modal/Modal.js';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummer.js';
import Spinner from '../../components/UI/Spinner/Spinner.js';
import axiosInstance from '../../axios-orders.js';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    };

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
                    .map(igKey => {return ingredients[igKey];})
                    .reduce((sum, el) => {return sum + el},0 );
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const additionPrice = INGREDIENT_PRICES[type];
        const newPrice = oldPrice + additionPrice;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler =(type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const priceDeduction = INGREDIENT_PRICES[type];
       const newPrice = oldPrice - priceDeduction;
       this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
       this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const order ={
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'sneha patil',
                address: {
                    city: 'Mumbai',
                    zipcode: '400101'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'COD'
        };
        axiosInstance.post('/order.json', order)
        .then(response => this.setState({loading: false, purchasing: false}))
        .catch(error => this.setState({loading: false, purchasing: false}));
    }


    render(){
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let ordersummery = <OrderSummery totalPrice={this.state.totalPrice} ingredients={this.state.ingredients} continueOrder={this.purchaseContinueHandler} cancelOrder={this.purchaseCancelHandler}/>;
        if(this.state.loading){
            ordersummery = <Spinner />;
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {ordersummery}
                </Modal>
                <Burger ingredients= {this.state.ingredients} />
                <BuildControls ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler}
                disabled = {disabledInfo} price={this.state.totalPrice} purchased={this.purchaseHandler} purchasable={this.state.purchasable}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;