import React, { useEffect, useState } from 'react'
import { db } from '../services/firebase'

const ChefView = ({ userId }) => {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      await db
        .collection('chefOrders')
        .where('assignedTo', '==', userId)
        .onSnapshot(r => {
          setOrders(
            r.empty
              ? []
              : r.docs.map(order => ({
                  ...order.data(),
                  id: order.id,
                }))
          )
        })
    }
    fetchData()
  })
  return (
    <div>
      {orders.map(order => (
        <>
          <h3>Order # {order.id}</h3>
          <ul>
            {order.items.map(i => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </>
      ))}
    </div>
  )
}

export default ChefView
