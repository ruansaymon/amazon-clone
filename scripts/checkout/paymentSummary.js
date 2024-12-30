import { cart,calculateCartQuantity } from '../../data/cart.js';
import  { getProduct } from '../../data/products.js';
import  { getDeliveryOption } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';

export default function renderPaymentSummary () {
  const costs = calculateCosts ();

  document.querySelector('.js-payment-summary')
    .innerHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${calculateCartQuantity()}):</div>
      <div class="payment-summary-money">$${costs.productsCost}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${costs.shippingCost}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${costs.totalBeforeTaxCost}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${costs.taxCost}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${costs.totalCost}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `
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