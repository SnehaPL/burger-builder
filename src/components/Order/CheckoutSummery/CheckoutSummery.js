import React from 'react';

import classes from './CheckoutSummery.css';
import Burger from '../../Burger/Burger.js';
import Button from '../../UI/Button/Button.js';

const checkoutSummery = (props) => {
    return (
        <div className={classes.CheckoutSummery}>
            <h1>We hope it tastes well!</h1>
            <div style={{width:'100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
                <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
            </div>
        </div>
    );
}

export default checkoutSummery;