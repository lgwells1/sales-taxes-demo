import React, { Component } from 'react';
import ProductList from './products/ProductList';
import Cart from './Cart'

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { 
      products: [], 
      cart: {},
      cartVisible: false,
      loading: true };
  }

  componentDidMount() {
    this.getProducts();
  }

  showCart = event => {
    this.setState( { cartVisible: !this.state.cartVisible });
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
    console.log("ADDING TO CART");
    console.log(cart);
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

  async getProducts() {
    const response = await fetch('product');

    const data = await response.json();
    this.setState({ products: data, loading: false });
    console.log(data);
  }

  render() {
    let contents = this.state.loading
    ? <p><em>Loading...</em></p>
    : <ProductList 
        products={this.state.products}
        addToCart={this.addToCart}/>
    return (
      <div>
        <h1>Welcome to Kwik-E-Mart</h1>
        <div>
          { contents }
        </div>
        <div>
          <button
            onClick={e => {
              this.showCart(e);
            }}>
          Cart
          </button>
        </div>
        <div>
          <Cart
          emptyCart={this.emptyCart}
          removeFromCart={this.removeFromCart}
          cart={this.state.cart}
          onClose={this.showCart}
          show={this.state.cartVisible} 
          />
        </div>
      </div>
    );
  }
}
