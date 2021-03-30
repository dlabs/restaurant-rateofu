import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/order.model';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  constructor() { }
  @Input() myOrder: Order;

  ngOnInit(): void {
  }
}
