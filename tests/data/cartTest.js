import { cart, addToCart, loadFromStorage, removeFromCart } from '../../src/data/cart.js';          

describe('test suite: addToCart', () => {
  beforeEach (() => {
    spyOn(localStorage,'setItem');
  });
  
  it ('adds an existing product to cart',() => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
        deliveryOptionId:'1',
      }]);
    });
    loadFromStorage();
        
    addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d',1);
    
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity:2,
      deliveryOptionId:'1',
    }]));
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');               
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual('1');  
  });
  
  it ('adds a new product to cart',() => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
        
    addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d',1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity:1,
      deliveryOptionId:'1',
    }]));
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('1');
  });
});

describe('test suite: removeFromCart', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const idNotInCart = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';

  beforeEach(() => {
    spyOn(localStorage,'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2,
        deliveryOptionId:'1',
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
        deliveryOptionId:'1',
      }]);
    });

    loadFromStorage();
  });

  it ('removes a productId that is in the cart', () => {
    removeFromCart(productId1);

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity:1,
      deliveryOptionId:'1',
    }]));
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');               
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('1');  
  });
  
  it ('removes a productId that is not in the cart', () => {
    removeFromCart(idNotInCart);

    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:2,
      deliveryOptionId:'1',
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity:1,
      deliveryOptionId:'1',
    }]));
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId1);               
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual('1');  
    expect(cart[1].productId).toEqual(productId2);               
    expect(cart[1].quantity).toEqual(1);
    expect(cart[1].deliveryOptionId).toEqual('1');  
  });
});