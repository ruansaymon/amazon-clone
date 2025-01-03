import { validDeliveryOption } from './deliveryOptions.js';

// I'll change the original file for a oop-version later.

class Cart {
  cartItems = [];
  #localStorageKey;
  
  constructor (localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage () {
    this.cartItems  = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  saveToLocalStorage () {
    localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
  }

  getCartItem(productId) {
    const cartItem = this.cartItems.find(cartItem => productId === cartItem.productId);
    return cartItem;
  }

  addToCart(productId,quantity) {
    const cartItem = this.getCartItem(productId);
  
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      this.cartItems.push({productId, quantity, deliveryOptionId:'1'});
    }
    
    this.saveToLocalStorage();
  }

  removeFromCart (productId) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);
    this.saveToLocalStorage();
  }
  
  calculateCartQuantity () {
    let cartQuantity = 0;
    this.cartItems.forEach(cartItem => cartQuantity += cartItem.quantity);
    return cartQuantity;
  }

  updateQuantity(productId, updatedQuantity) {
    const cartItem = this.getCartItem(productId);
    if (cartItem) {
      cartItem.quantity = updatedQuantity;
      this.saveToLocalStorage();
    }
  }

  updateDeliveryOption (productId, updatedDeliveryOptionId) {
    const cartItem = this.getCartItem(productId);
    const isValid = validDeliveryOption(updatedDeliveryOptionId);
      
    if (cartItem && isValid) {
      cartItem.deliveryOptionId = updatedDeliveryOptionId;
      this.saveToLocalStorage();
    }
    
    return;
  }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('business-cart-oop');

console.log(cart.cartItems);
console.log(businessCart.cartItems);