import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency } from '../utils/money.js';

export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function validDeliveryOption (deliveryOptionId) {
  const deliveryOption = deliveryOptions.find(deliveryOption => deliveryOption.id === deliveryOptionId);
  if (!deliveryOption) return false;
  return true;
}

export function getDeliveryOption (deliveryOptionId) {
  const deliveryOption = deliveryOptions.find(deliveryOption => deliveryOption.id === deliveryOptionId);
  return deliveryOption || deliveryOptions[0];
}

function isWeekend(date) {
  const weekend = ['Saturday','Sunday'];
  const formattedDate = date.format('dddd');
  if (weekend.includes(formattedDate)) return true;
  return false;
}

export function calculateDeliveryDate (deliveryOption) {
  let deliveryDate = dayjs(); // Starts at today value.

  let daysToAdd = deliveryOption.deliveryDays;
  while (daysToAdd !== 0) {
    deliveryDate = deliveryDate.add(1,'day');
    if (isWeekend(deliveryDate)) continue;
    daysToAdd--;
  }

  const dateString = deliveryDate.format('dddd, MMMM D');
  const priceString = deliveryOption.priceCents === 0 
                      ? 'FREE Shipping'
                      : `$${formatCurrency(deliveryOption.priceCents)} - Shipping`;
  return {dateString, priceString};
}