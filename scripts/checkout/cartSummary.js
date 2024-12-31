import { cart,removeFromCart,calculateCartQuantity,updateQuantity,updateDeliveryOption } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption, deliveryOptions } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import renderPaymentSummary from './paymentSummary.js';
import renderCheckoutHeader from './checkoutHeader.js';

export default function renderCartSummary(){
  let cartSummaryHTML = '';

  cart.forEach(cartItem => {
    const { productId, quantity,deliveryOptionId } = cartItem;
    
    const matchingProduct = getProduct(productId);
    const { id, image, name, priceCents } = matchingProduct;
    
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const deliveryDate = calculateDeliveryDate(deliveryOption);
  
    cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container-${id}">
              <div class="delivery-date">
                Delivery date: ${deliveryDate.dateString}
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
                  ${deliveryOptionsHTML(id,cartItem)}
                </div>
              </div>
            </div>
    `
  })
  
  document.querySelector('.js-cart-summary').innerHTML = cartSummaryHTML;  

  attachEventListeners();
}

function attachEventListeners () {  
  document.querySelectorAll('.js-delete-link').forEach(link => {
    link.addEventListener('click', event => handleDeleteButton(event))});
  
  document.querySelectorAll('.js-update-link').forEach(link => {
    link.addEventListener('click', event => handleUpdateButton (event))});
  
  document.querySelectorAll('.js-save-update-link').forEach(link => {
    link.addEventListener('click', event => handleSaveUpdateButton(event))});
  
  document.querySelectorAll('.js-update-quantity-input').forEach(input => {
    input.addEventListener('keydown', event => handleKeydownOnUpdate(event))
  })
  
  document.querySelectorAll('.js-delivery-option').forEach(element => {
    element.addEventListener('click', event => handleUpdateDeliveryOption(event))
  })
}

function handleDelete (productId) {
  removeFromCart(productId);
  
  renderCheckoutHeader();
  renderCartSummary();
  renderPaymentSummary();
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

  let alertElement = document.querySelector(`.js-update-alert-${productId}`);
  alertElement.innerHTML = '';
  if (updatedQuantity < 0 || isNaN(updatedQuantity)) {
    alertElement.innerHTML = "Not a valid quantity!"
    return;
  } else if (updatedQuantity === 0) {
    handleDelete (productId);
    return;
  }

  updateQuantity(productId,updatedQuantity);
  
  const productContainer = document.querySelector(`.js-cart-item-container-${productId}`);
  productContainer.classList.remove('is-editing-quantity');

  renderCheckoutHeader();
  renderCartSummary();
  renderPaymentSummary();
}

function handleKeydownOnUpdate (event) {
  if (event.key === 'Enter') {
    const { productId } = event.target.dataset;
    handleSaveUpdateButton({ target: { dataset: { productId } } });
  }
}

function calculateDeliveryDate (deliveryOption) {
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
  const dateString = deliveryDate.format('dddd, MMMM D');
  const priceString = deliveryOption.priceCents === 0 
                      ? 'FREE Shipping'
                      : `$${formatCurrency(deliveryOption.priceCents)} - Shipping`;
  return {dateString, priceString};
}

function deliveryOptionsHTML (id,cartItem) {
  let html = '';
  
  deliveryOptions.forEach(deliveryOption => {
    const deliveryDate = calculateDeliveryDate(deliveryOption);
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option js-delivery-option"
            data-product-id="${id}"
            data-delivery-option-id=${deliveryOption.id}>
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${id}">
        <div>
          <div class="delivery-option-date">
            ${deliveryDate.dateString}
          </div>
          <div class="delivery-option-price">
            ${deliveryDate.priceString}
          </div>
        </div>
      </div>
    `
  });
  
  return html;
}

function handleUpdateDeliveryOption (event) {
  const { productId, deliveryOptionId } = event.currentTarget.dataset;
  updateDeliveryOption(productId, deliveryOptionId);
  
  renderCheckoutHeader();
  renderCartSummary();
  renderPaymentSummary();
}