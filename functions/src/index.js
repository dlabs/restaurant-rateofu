const functions = require('firebase-functions')
const admin = require('firebase-admin')
const serviceAccount = require('./config/firebase.json')

const credential = admin.credential.cert(serviceAccount)
admin.initializeApp({
  credential,
  databaseURL: 'localhost:8080',
})

//TODO: get employee with least orders
const getEmployeeWithLeastOrders = items => items && items[0]

exports.onOrderWrite = functions.firestore
  .document('/orders/{orderId}')
  .onCreate(async snapshot => {
    console.log('snap', snapshot.id)
    const allItems = snapshot.get('items')
    const foodItems = allItems.filter(i => i.type === 'food')
    if (foodItems && Object.keys(foodItems).length > 0) {
      const chefs = await admin
        .firestore()
        .collection('employees')
        .where('role', '==', 'chef')
        .get()
      const chef = getEmployeeWithLeastOrders(chefs.docs)
      if (chef && chef.exists) {
        console.log('chef', chef.id)
        await admin
          .firestore()
          .collection('chefOrders')
          .add({
            orderId: snapshot.id,
            items: foodItems.map(di => di.item),
            assignedTo: chef.id,
          })
      }
    }
    const drinkItems = allItems.filter(i => i.type === 'drink')
    if (drinkItems && Object.keys(drinkItems).length > 0) {
      const barmans = await admin
        .firestore()
        .collection('employees')
        .where('role', '==', 'barman')
        .get()
      const barman = getEmployeeWithLeastOrders(barmans.docs)
      if (barman && barman.exists) {
        console.log('barman', barman.id)
        await admin
          .firestore()
          .collection('barmanOrders')
          .add({
            orderId: snapshot.id,
            items: drinkItems.map(di => di.item),
            assignedTo: barman.id,
          })
      }
    }
    await snapshot.ref.set(
      {
        assigned: true,
      },
      { merge: true }
    )
  })
