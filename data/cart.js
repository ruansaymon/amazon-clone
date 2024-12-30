export let cart = JSON.parse(localStorage.getItem('cart')) || 
// Inserted some test data for now only.
[{
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity:2,
  deliveryOptionId: '1',
}, {
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity:1,
  deliveryOptionId: '2',
}
];

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