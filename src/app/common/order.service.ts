import { AngularFirestore } from '@angular/fire/firestore'
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private firestore: AngularFirestore) { }

  getOrders() {
    return this.firestore.collection('orders').snapshotChanges();
  }
}
