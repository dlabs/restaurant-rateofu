import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/common/login.service';
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

  constructor(private orderService: OrderService, public loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    if (!this.loginService.userRole) {
      this.router.navigate(['/login']);
    }
    this.orderService.getOrders().subscribe(data => {
      this.allOrders = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as any)
        } as Order;
      })

      this.allOrders.map(order => {
        console.log(order.items);

        if (this.loginService.userRole == 'waiter') {
          order.items = order.items.filter(item => {
            return item.status == 'ready'
          })
        } else {
          order.items = order.items.filter(item => {
            return item.status == 'ordered' || item.status == 'preparing';
          })
        }
        console.log(order.items);
      })
    })

  }

  onStatusUpdate(event) {
    let order = this.allOrders.filter(order => order.id == event.orderId).pop()
    order.items[event.itemId].status = event.status;

    this.orderService.updateOrder(order)
  }
}
