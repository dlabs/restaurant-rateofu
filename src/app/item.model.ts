export interface Item {
  name: string,
  quantity: number,
  price_per_item: number,
  status: 'ordered' | 'preparing' | 'ready' | 'served'
}
