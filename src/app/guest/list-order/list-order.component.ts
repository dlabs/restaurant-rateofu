import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/common/order.service';
import { Order } from 'src/app/order.model';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  orders: Order[]
  myOrder: Order;
  // todo: make dynimic
  tableId = 'table1'

  ngOnInit(): void {
    // get all orders
    this.orderService.getOrders().subscribe(data => {
      this.orders = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as any)
        } as Order
      })
      this.myOrder = this.orders.filter((order) => {
        return order.tableId == this.tableId
      }).shift()
    })
  }
}
