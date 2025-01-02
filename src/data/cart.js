import {validDeliveryOption} from './deliveryOptions.js';

export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}

function saveToLocalStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function getCartItem(productId) {
  const cartItem = cart.find(cartItem => productId === cartItem.productId);
  return cartItem;
}

export function addToCart(productId,quantity) {
  const cartItem = getCartItem(productId);

  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.push({productId, quantity, deliveryOptionId:'1'});
  }
  
  saveToLocalStorage();
}

export function removeFromCart (productId) {
  cart = cart.filter(cartItem => cartItem.productId !== productId);
  saveToLocalStorage();
}

export function calculateCartQuantity () {
  let cartQuantity = 0;
  cart.forEach(cartItem => cartQuantity += cartItem.quantity);
  return cartQuantity;
}

export function updateQuantity(productId, updatedQuantity) {
  const cartItem = getCartItem(productId);
  if (cartItem) {
    cartItem.quantity = updatedQuantity;
    saveToLocalStorage();
  }
} 

export function updateDeliveryOption (productId, updatedDeliveryOptionId) {
  const cartItem = getCartItem(productId);
  const isValid = validDeliveryOption(updatedDeliveryOptionId);
    
  if (cartItem && isValid) {
    cartItem.deliveryOptionId = updatedDeliveryOptionId;
    saveToLocalStorage();
  }
  
  return;
}
