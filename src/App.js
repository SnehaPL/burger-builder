import React, { Component } from 'react';
import Layout from './components/Layout/Layout.js';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder.js';
import Checkout from './containers/Checkout/Checkout.js';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <BurgerBuilder />
            <Checkout />
        </Layout>
      </div>
    );
  }
}

export default App;
