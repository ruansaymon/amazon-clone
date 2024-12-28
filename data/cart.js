export const cart = [];

export function addToCart(productId,quantity) {
  let matchingCartItem;

  cart.forEach(cartItem => {
    if (cartItem.productId === productId) {matchingCartItem = cartItem;}
  });

  if (matchingCartItem) {
    matchingCartItem.quantity += quantity;
  } else {
    cart.push({productId, quantity});
  }
}