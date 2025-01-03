import { addToCart,calculateCartQuantity } from './data/cart.js';
import { products } from './data/products.js';
import { formatCurrency } from './utils/money.js';

let productsHTML = '';

products.forEach(product => {
  const { id,image, name, priceCents, rating } = product;
  const html = `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${id}"
          >
            Add to Cart
          </button>
        </div>
  `;
  productsHTML += html;
});

document.querySelector('.jsproducts-grid').innerHTML = productsHTML;

updateCartQuantity();

const addedMessageTimeouts = {};

document.querySelectorAll('.js-add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    // Initializing variables
    const { productId } = button.dataset;
    const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

    // Calling the functions
    addToCart(productId,quantity);
    updateCartQuantity();
    displayAddedMessage(productId);
  });
});

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }

function displayAddedMessage(productId) {
  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  
  addedMessage.classList.add('added-to-cart-visible');

  const previousTimeoutId = addedMessageTimeouts[productId];
  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId);
  }

  const timeoutId = setTimeout(_ => addedMessage.classList.remove('added-to-cart-visible'),2000);
  addedMessageTimeouts[productId] = timeoutId;
}