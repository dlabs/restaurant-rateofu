import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/common/order.service';
import { Order } from 'src/app/order.model';

@Component({
  selector: 'app-submit-order',
  templateUrl: './submit-order.component.html',
  styleUrls: ['./submit-order.component.css']
})
export class SubmitOrderComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  orders: Order[]

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as any)
        } as Order
      })
      console.log(this.orders);

    })
  }

}
