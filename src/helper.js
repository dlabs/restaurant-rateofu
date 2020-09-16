import { db } from './services/firebase'

export const fetchOrders = async () => {
  const orders = await db.collection('orders').get()
  if(orders.empty) {
    return []
  }
  return orders.docs.map(order => ({
    ...order.data(),
    id: order.id,
  }))
}
