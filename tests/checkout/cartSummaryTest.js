import renderCartSummary from '../../src/checkout/cartSummary.js';
import {cart,loadFromStorage } from '../../src/data/cart.js';          

describe('test suite: renderCartSummary',() => {
  const productId1 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const productId2 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';
  
  beforeEach(() => {
    spyOn(localStorage,'setItem');
    
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-cart-summary"></div>
      <div class="js-payment-summary"></div>
      <div class="js-checkout-header"> </div>
    `;

    spyOn(localStorage, 'getItem').and.callFake(() => {               
      return JSON.stringify([{
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:2,
        deliveryOptionId:'1',
      }, {
        productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        quantity: 1,
        deliveryOptionId: '2',
      }]);
    });
    loadFromStorage();

    renderCartSummary();
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });
  
  it ('displays the cart',() => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length)
        .toEqual(2);
    
    expect(document.querySelector(`.js-quantity-${productId1}`)
      .innerText).toContain(2);
    expect(document.querySelector(`.js-quantity-${productId2}`)
      .innerText).toContain(1);
    
    expect(document.querySelector(`.js-product-name-${productId1}`)
      .innerText).toEqual('Intermediate Size Basketball');
    expect(document.querySelector(`.js-product-name-${productId2}`)
      .innerText).toEqual('Adults Plain Cotton T-Shirt - 2 Pack');

    expect(document.querySelector(`.js-product-price-${productId1}`).innerText)
      .toEqual('$20.95')
    expect(document.querySelector(`.js-product-price-${productId2}`).innerText)
      .toEqual('$7.99')
});

  it ('removes a product',() => {
    document.querySelector(`.js-delete-link-${productId1}`).click();
    
    expect(document.querySelectorAll('.js-cart-item-container').length)
      .toEqual(1);
    
    expect(document.querySelector(`.js-product-name-${productId2}`).innerText)
      .toEqual('Adults Plain Cotton T-Shirt - 2 Pack');
      
    expect(document.querySelector(`.js-product-price-${productId2}`).innerText)
      .toEqual('$7.99')
    
    expect(document.querySelector(`.js-cart-item-container-${productId1}`))
      .toEqual(null);
    expect(document.querySelector(`.js-cart-item-container-${productId2}`))
      .not.toEqual(null);
    
    expect(cart.length).toEqual(1);
  });
});