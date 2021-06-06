import currency from "currency.js"

export const RUB = (number: number) => currency(number, { symbol: '', decimal: ',', separator: ' ', precision: 0 }).format() + ' ₽';
