import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/common/order.service';
import { Item } from 'src/app/item.model';
import { Order } from 'src/app/order.model';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.css']
})
export class ListAllComponent implements OnInit {

  allOrders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(data => {
      this.allOrders = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as any)
        } as Order;
      })

      console.log(this.allOrders);
    })
  }

  onStatusUpdate(event) {
    let order = this.allOrders.filter(order => order.id == event.orderId).pop()
    order.items[event.itemId].status = event.status;

    this.orderService.updateOrder(order)
  }
}
