import { Component, OnInit, ViewChild } from '@angular/core';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { AppService } from 'src/app/appservice.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @ViewChild('itemsOnDom', { static: false }) itemsOnDom: MatSelectionList;

  public $items: any;
  public quantity = 0;
  public orderObject = [];

  constructor(private appservice: AppService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.$items = this.appservice.getItems();
  }

  placeOrder() {
    console.log("check the list", this.itemsOnDom.selectedOptions.selected);
    let itemsArray = [];
    this.itemsOnDom.selectedOptions.selected.forEach((item: any)=>{
      itemsArray.push(item._value);
    }); 
    // console.log("items fields ",orderArray);
    const drinkOrders = itemsArray.filter((item)=>{
      return item.type==="drink";
    });
    const foodOrders = itemsArray.filter((item)=>{
      return item.type==="food";
    });

    const batchTypeOrder = [drinkOrders,foodOrders];
    const buildOrder = {
      "order": JSON.stringify(itemsArray),
      "status": "pending",
      "batchTypeOrder": JSON.stringify(batchTypeOrder)      
    }
    this.appservice.createOrder(buildOrder).subscribe((order)=>{
      console.log("order created sucessfully ",order);
      this.router.navigate(["login"]);
      this.snackBar.open("Your order has been accepted and will be processed shortly. Thank you!", "", {
        duration: 5000,
      });
      
    },error=>{
      console.log(error);
    })
  }

}
