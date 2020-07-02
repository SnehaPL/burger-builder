import React, {Component} from 'react';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner.js';
import Button from '../../../components/UI/Button/Button.js';
import axiosInstance from '../../../axios-orders.js';

class ContactData extends Component {
    state ={
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order ={
            ingredients: this.props.ingredients,
            price: this.props.price,
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
        .then(response => {
            this.setState({loading: false});
            this.props.history.push("/");
        })
        .catch(error => this.setState({loading: false}));
    }

    render(){
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if(this.state.loading){
            form = <Spinner />
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;