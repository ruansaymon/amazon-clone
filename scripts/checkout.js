import { cart,removeFromCart,calculateCartQuantity,updateQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let cartSummaryHTML = '';

cart.forEach(cartItem => {
  const { productId, quantity } = cartItem;
  const matchingProduct = products.find(product => product.id === productId);
  const { id, image, name, priceCents } = matchingProduct;

  const html = `
          <div class="cart-item-container js-cart-item-container-${id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${name}
                </div>
                <div class="product-price">
                  $${formatCurrency(priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-${id}">${quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" 
                        data-product-id="${id}">
                    Update
                  </span>
                  <input class="update-quantity-input js-update-quantity-input js-update-quantity-input-${id}"
                          data-product-id="${id}">
                  <span class="link-primary save-update-quantity-link js-save-update-link"
                        data-product-id="${id}">
                    Save
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" 
                        data-product-id="${id}">
                    Delete
                  </span>
                  <p class="update-alert js-update-alert-${id}"></p>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `
  cartSummaryHTML += html;
})

updateCartQuantity();

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;  

document.querySelectorAll('.js-delete-link').forEach(link => {
  link.addEventListener('click', event => handleDeleteButton(event))});

document.querySelectorAll('.js-update-link').forEach(link => {
  link.addEventListener('click', event => handleUpdateButton (event))});

document.querySelectorAll('.js-save-update-link').forEach(link => {
  link.addEventListener('click', event => handleSaveUpdateButton(event))});

document.querySelectorAll('.js-update-quantity-input').forEach(input => {
  input.addEventListener('keydown', event => handleKeydownOnUpdate(event))
})

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector('.js-checkout-items').innerHTML = `${cartQuantity} items`;
}

function handleDelete (productId) {
  removeFromCart(productId);
  document.querySelector(`.js-cart-item-container-${productId}`).remove();
  updateCartQuantity();
}

function handleDeleteButton (event) {
  const { productId } = event.target.dataset;
  handleDelete (productId);
}

function handleUpdateButton (event) {
  const { productId } = event.target.dataset;
  const productContainer = document.querySelector(`.js-cart-item-container-${productId}`);
  productContainer.classList.add('is-editing-quantity');
}

function handleSaveUpdateButton (event) {
  const { productId } = event.target.dataset;
  
  const updatedQuantity = Number(document.querySelector(`.js-update-quantity-input-${productId}`).value);

  let alertButton = document.querySelector(`.js-update-alert-${productId}`);
  alertButton.innerHTML = '';
  if (updatedQuantity < 0 || isNaN(updatedQuantity)) {
    alertButton.innerHTML = "Not a valid quantity!"
    return;
  } else if (updatedQuantity === 0) {
    handleDelete (productId);
    return;
  }

  updateQuantity(productId,updatedQuantity);
  
  const productContainer = document.querySelector(`.js-cart-item-container-${productId}`);
  productContainer.classList.remove('is-editing-quantity');

  document.querySelector(`.js-quantity-${productId}`).innerHTML = updatedQuantity;
  updateCartQuantity();
}

function handleKeydownOnUpdate (event) {
  if (event.key === 'Enter') {
    const { productId } = event.target.dataset;
    handleSaveUpdateButton({ target: { dataset: { productId } } });
  }
}