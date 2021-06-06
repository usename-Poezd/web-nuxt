export const getPrice = (prices: Array<any>): number =>
  prices.find(p => p.type === 'main').amount;
