import { validDeliveryOption } from './deliveryOptions.js';

function Cart(localStorageKey) {
  const cart = {
    cartItems: [],
    
    loadFromStorage () {
      this.cartItems  = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    },
  
    saveToLocalStorage () {
      localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
    },
  
    getCartItem(productId) {
      const cartItem = this.cartItems.find(cartItem => productId === cartItem.productId);
      return cartItem;
    },
  
    addToCart(productId,quantity) {
      const cartItem = this.getCartItem(productId);
    
      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        this.cartItems.push({productId, quantity, deliveryOptionId:'1'});
      }
      
      this.saveToLocalStorage();
    },
  
    removeFromCart (productId) {
      this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);
      this.saveToLocalStorage();
    },
    
    calculateCartQuantity () {
      let cartQuantity = 0;
      this.cartItems.forEach(cartItem => cartQuantity += cartItem.quantity);
      return cartQuantity;
    },
  
    updateQuantity(productId, updatedQuantity) {
      const cartItem = this.getCartItem(productId);
      if (cartItem) {
        cartItem.quantity = updatedQuantity;
        this.saveToLocalStorage();
      }
    },
  
    updateDeliveryOption (productId, updatedDeliveryOptionId) {
      const cartItem = this.getCartItem(productId);
      const isValid = validDeliveryOption(updatedDeliveryOptionId);
        
      if (cartItem && isValid) {
        cartItem.deliveryOptionId = updatedDeliveryOptionId;
        this.saveToLocalStorage();
      }
      
      return;
    },
  }

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('business-cart-oop');

cart.loadFromStorage();
cart.addToCart('77919bbe-0e56-475b-adde-4f24dfed3a04',10);

businessCart.loadFromStorage();
businessCart.addToCart('77919bbe-0e56-475b-adde-4f24dfed3a04',5);

console.log(cart.cartItems);
console.log(businessCart.cartItems);