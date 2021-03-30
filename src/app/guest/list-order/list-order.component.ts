import { Component, Input, OnInit } from '@angular/core';
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
  @Input() myOrder: Order;
  // todo: make dynimic
  tableId = 'table1'

  ngOnInit(): void {
    // should get only the order for this table, not all
    /*
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
    */
  }
}
