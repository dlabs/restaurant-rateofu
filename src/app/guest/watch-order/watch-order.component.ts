import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/common/order.service';
import { Order } from 'src/app/order.model';

@Component({
  selector: 'app-watch-order',
  templateUrl: './watch-order.component.html',
  styleUrls: ['./watch-order.component.css']
})
export class WatchOrderComponent implements OnInit {

  tableId = 'table1';
  myOrder: Order;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    // should get only the order for this table, not all
    this.orderService.getOrders().subscribe(data => {
      let orders = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as any)
        } as Order
      });
      this.myOrder = orders.filter((order) => {
        return order.tableId == this.tableId
      }).shift()
    })
  }

}
