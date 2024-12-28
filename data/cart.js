export const cart = [
  // Arbitrary data to develop this page.
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
  {
    productId: "77919bbe-0e56-475b-adde-4f24dfed3a04",
    quantity: 4,
  },
];

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