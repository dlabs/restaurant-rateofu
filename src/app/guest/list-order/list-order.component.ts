import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/item.model';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  constructor() { }
  @Input() items: Item[] = [];

  ngOnInit(): void {
  }
}
