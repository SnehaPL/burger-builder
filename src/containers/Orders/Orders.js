import React, {Component} from 'react';
import Order from '../../components/Order/Order.js';
import axiosInstance from '../../axios-orders.js';
import withErrors from '../../hoc/withErrorHandler/withErrorHandler.js';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){
        axiosInstance.get('https://react-burgur-app.firebaseio.com/order.json')
        .then(res => {
            let fetchData =[];
            for(let key in res.data){
                fetchData.push({
                    ...res.data[key],
                    id: key
                })
            }
            this.setState({loading: false, orders: fetchData});
        })
        .catch(err => {
            this.setState({loading:false})
        })
    }

    render(){
        return (
        <div>
            {this.state.orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={order.price}/>)}
         </div>
        );
    }
}

export default withErrors(Orders, axiosInstance);