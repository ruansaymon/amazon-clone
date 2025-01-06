import { formatCurrency } from '../utils/money.js';

class Product {
  constructor (productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  getStarsUrl = () => `images/ratings/rating-${this.rating.stars*10}.png`

  getPrice = () =>`$${formatCurrency(this.priceCents)}`

  extraInfoHTML = () => ''
}

class Clothing extends Product {
  constructor (productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML = () => `<a href="${this.sizeChartLink}" target="_blank">Size Chart</a>`
}

const productClasses = {
  clothing: Clothing,
}

export let products = [];

export async function loadProducts () {
  const response = await fetch('https://supersimplebackend.dev/products');
  const productsData = await response.json();
  products = productsData.map((productDetails) => {
      const productClass = productClasses[productDetails.type] || Product;
      return new productClass(productDetails)
    });
}

export function getProduct (productId) {
  const product = products.find(product => product.id === productId);
  return product;
}