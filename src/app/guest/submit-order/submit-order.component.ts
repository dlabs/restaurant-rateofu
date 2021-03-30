import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/common/order.service';
import { Order } from 'src/app/order.model';

@Component({
  selector: 'app-submit-order',
  templateUrl: './submit-order.component.html',
  styleUrls: ['./submit-order.component.css']
})
export class SubmitOrderComponent implements OnInit {

  tableId = 1;
  order: Order;
  orderForm = new FormGroup({
    itemName: new FormControl(''),
    quantity: new FormControl(''),
  });

  constructor(private orderService: OrderService, private router: Router) { }

  menu = [
    { name: "Grilled space-whale steak woth algea puree", type: 'food', price: 66.5 },
    { name: "Tea substitute", type: 'drink', price: 1.5 },
    { name: "Hagro buiscits", type: 'food', price: 32 },
    { name: "Ameglian Major Cow casserole", type: 'food', price: 55.75 },
    { name: "Pan Galactic Gargle Blaster", type: 'drink', price: 5.5 },
    { name: "Janx Spirit", type: 'Drink', price: 7 },
  ]

  ngOnInit(): void {
    this.order = {
      id: 'random order id',
      items: [],
      tableId: "table" + this.tableId
    }
  }

  // todo: add validation on the form
  onAddToOrder() {
    this.order.items.push({
      name: this.orderForm.value.itemName,
      price_per_item: 123123123,
      quantity: this.orderForm.value.quantity,
      status: 'ordered',
    });
  }

  onSendOrder() {
    if (this.order.items.length < 1) {
      // todo: beautify this error
      alert("Can't subnit an empty order")
      return;
    }
    this.orderService.postOrder(this.order).then(() => {
      this.router.navigate(['/guest']);
    });
  }
}
