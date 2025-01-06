import { cart,calculateCartQuantity } from '../data/cart.js';
import  { getProduct } from '../data/products.js';
import  { getDeliveryOption } from '../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';
import { addOrder } from '../data/orders.js';

export default function renderPaymentSummary () {
  const costs = calculateCosts ();

  document.querySelector('.js-payment-summary')
    .innerHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${calculateCartQuantity()}):</div>
      <div class="payment-summary-money">$
       ${costs.productsCost}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-payment-summary-shipping-cost">
        $${costs.shippingCost}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${costs.totalBeforeTaxCost}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$
        ${costs.taxCost}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-payment-summary-total-cost">
        $${costs.totalCost}
      </div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `;

  document.querySelector('.js-place-order').addEventListener('click',() => {
    handlePlaceOrder();
  })
}

function calculateCosts () {
  let productsPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach(cartItem => {
    const product = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
   
    productsPriceCents += product.priceCents * cartItem.quantity;
    shippingPriceCents += deliveryOption.priceCents;

  })
  
  const totalBeforeTaxCents = productsPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const productsCost = formatCurrency(productsPriceCents);
  const shippingCost = formatCurrency(shippingPriceCents);
  const totalBeforeTaxCost = formatCurrency(totalBeforeTaxCents);
  const taxCost = formatCurrency(taxCents);
  const totalCost = formatCurrency(totalCents);

  return {productsCost,shippingCost,totalBeforeTaxCost,taxCost,totalCost}
}

async function handlePlaceOrder() {
  try {
    const response = await fetch('https://supersimplebackend.dev/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/JSON'
      },
      body: JSON.stringify({
        cart: cart
      })
    });
  
    const order = await response.json();
    addOrder(order);
  
  } catch (error) {
    console.log('Unexpected error. Try again later.')
  }

  window.location.href = 'orders.html';
}