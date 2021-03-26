import { Component, OnInit, ViewChild } from '@angular/core';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { AppService } from 'src/app/appservice.service';
import { NavigationExtras, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-order',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'date', 'status'];
  dataSource: any;
  batchOrder: any;

  constructor(private appservice: AppService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.appservice.getOrders().subscribe((data)=>{ 
      this.dataSource = data;
    });
  }

  getRecord(data) {
    console.log("check the data ",data);
    // data.for
  }


}
