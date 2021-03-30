import { AngularFirestore } from '@angular/fire/firestore'
import { Injectable } from '@angular/core';
import { Order } from '../order.model';
import { ListAllComponent } from '../staff/list-all/list-all.component';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private firestore: AngularFirestore) { }

  getOrders() {
    return this.firestore.collection('orders').snapshotChanges();
  }

  postOrder(order: Order) {
    return this.firestore.collection('orders').add(order);
  }

  getAllOrders() {
    return this.firestore.collection('orders').get()
  }
}
