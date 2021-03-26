import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  ordersUrl = "http://localhost:8080/api/orders";

  itemsUrl = "http://localhost:8080/api/items";

  constructor(private http: HttpClient) { }

  getOrders(): Observable<any> {
    return this.http.get<any>(`${this.ordersUrl}`);
  }

  createOrder(data): Observable<any> {
    return this.http.post<any>(`${this.ordersUrl}`, data);
  }

  getItems(): Observable<any> {
    return this.http.get<any>(`${this.itemsUrl}`);
  }

}
