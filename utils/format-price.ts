import currency from "currency.js"

export const RUB = (number: number) => currency(number, { symbol: '', decimal: ',', separator: ' ', precision: 0 }).format() + ' ₽';

export const USD = (number: number) => currency(number, { symbol: '', decimal: '.', separator: ' ', precision: 2 }).format() + ' US$';

export const EUR = (number: number) => currency(number, { symbol: '', decimal: '.', separator: ' ', precision: 2 }).format() + '€';
