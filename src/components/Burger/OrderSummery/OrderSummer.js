import React from 'react';
import Aux from '../../../hoc/Auxiliary.js';
import Button from '../../UI/Button/Button.js';

const orderSummery = (props) => {
    const ingredientSummery = Object.keys(props.ingredients)
                                .map(igkey => {
                                    return (
                                        <li key={igkey}>
                                            <span style={{textTransform: 'capitalize'}}>{igkey}</span> : {props.ingredients[igkey]}
                                        </li>
                                    )
                                });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummery}
            </ul>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.cancelOrder}>Cancel</Button>
            <Button btnType="Success" clicked={props.continueOrder}>Continue</Button>
        </Aux>
    );
};

export default orderSummery;