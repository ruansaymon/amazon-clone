export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToLocalStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId,quantity,deliveryOptionId) {
  let matchingCartItem;

  cart.forEach(cartItem => {
    if (cartItem.productId === productId) {matchingCartItem = cartItem;}
  });

  if (matchingCartItem) {
    matchingCartItem.quantity += quantity;
  } else {
    cart.push({productId, quantity, deliveryOptionId});
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
  const cartItem = cart.find(cartItem => productId === cartItem.productId);
  if (cartItem) {
    cartItem.quantity = updatedQuantity;
    saveToLocalStorage();
  }
} 

export function updateDeliveryOption (productId, updatedDeliveryOptionId) {
  const cartItem = cart.find(cartItem => productId === cartItem.productId);
  if (cartItem) {
    cartItem.deliveryOptionId = updatedDeliveryOptionId;
    saveToLocalStorage();
  }
}