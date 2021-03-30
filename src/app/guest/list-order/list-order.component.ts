import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderService } from 'src/app/common/order.service';
import { Item } from 'src/app/item.model';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  constructor() { }

  @Input() items: Item[] = [];
  @Input() orderId: string;
  @Output() upgradeStatus = new EventEmitter<{ orderId: string, itemId: number, status: string }>();

  ngOnInit(): void {
  }

  private getNewStatus(old: string) {
    switch (old) {
      case 'ordered':
        return 'preparing';
      case 'preparing':
        return 'ready';
      case 'ready':
        return 'served';
    }
  }

  onUpgradeStatus(orderId: string, itemId: number, status: string) {
    let newStatus = this.getNewStatus(status);
    this.upgradeStatus.emit({
      orderId: orderId,
      itemId: itemId,
      status: newStatus
    })
  }
}
