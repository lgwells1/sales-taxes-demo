import React, { Component } from 'react';
import ProductList from './products/ProductList';
import Cart from './cart/Cart'
import Checkout from './cart/Checkout';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: {},
      cartVisible: false,
      loading: true,
      receiptVisible: false
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  showCart = event => {
    this.setState({ cartVisible: !this.state.cartVisible, receiptVisible: false });
  };

  addToCart = item => {
    let cart = this.state.cart;
    if (cart[item.id]) {
      //Item exists already, increment quantity
      cart[item.id].amount += item.amount;
    }
    else {
      //Add item to cart
      cart[item.id] = item;
    }
    this.setState({ cart });
  };

  removeFromCart = itemId => {
    let cart = this.state.cart;

    delete cart[itemId];

    this.setState({ cart });
  };

  emptyCart = () => {
    let cart = {};
    this.setState({ cart });
  };

  showReceipt = event => {
    this.setState({ cartVisible: false, receiptVisible: true });
  }

  calculateReceipt = async () => {
    var carItems = [];

    for (var key in this.state.cart) {
      var item = {
        id: this.state.cart[key].product.id,
        quantity: this.state.cart[key].amount
      }
      carItems.push(item);
    }

    const requestOptions = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carItems)
    };

    const fetchedReceipt = await fetch('receipt', requestOptions)
      .then(function (response) {
        return response.json();
      });

    return fetchedReceipt;
  }

  async getProducts() {
    const response = await fetch('product');

    const data = await response.json();
    this.setState({ products: data, loading: false });
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : <ProductList
        products={this.state.products}
        addToCart={this.addToCart} />
    return (
      <div>
        <div className="columns">
          <div className="title column is-half">
            <h1>Welcome to Kwik-E-Mart</h1>
          </div>
          <div className="column">
            <button className="button is-primary is-pulled-right"
              onClick={e => {
                this.showCart(e);
              }}>
              Cart
            </button>
          </div>
        </div>
        <div>
          <div>
            <Cart
              emptyCart={this.emptyCart}
              removeFromCart={this.removeFromCart}
              cart={this.state.cart}
              onClose={this.showCart}
              show={this.state.cartVisible}
              showReceipt={this.showReceipt}
            />
          </div>
          <div>
            <Checkout
              calculateReceipt={this.calculateReceipt}
              show={this.state.receiptVisible}
              cart={this.state.cart}
            />
          </div>
        </div>
        <div>
          {contents}
        </div>
      </div>
    );
  }
}
