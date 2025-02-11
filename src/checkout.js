import renderCartSummary from "./checkout/cartSummary.js";
import renderPaymentSummary from "./checkout/paymentSummary.js";
import renderCheckoutHeader from "./checkout/checkoutHeader.js";
import { loadProducts } from "./data/products.js";

loadPage();

async function loadPage() {
  await loadProducts();
  
  renderCheckoutHeader();
  renderCartSummary();
  renderPaymentSummary();
}