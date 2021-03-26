import { Component, OnInit, ViewChild } from '@angular/core';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { AppService } from 'src/app/appservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-order',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})
export class OrdersDetailsComponent implements OnInit {

  allRouteData = null;

  constructor(private appservice: AppService, private router: Router, private snackBar: MatSnackBar, private route: ActivatedRoute, ) { }

  ngOnInit(): void {

  }




}
