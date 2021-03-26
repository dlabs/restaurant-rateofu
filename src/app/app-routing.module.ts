import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OrdersDetailsComponent } from './components/orders-details/orders-details.component';
import { OrdersComponent } from './components/orders/orders.component';


const appRoutes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "orders",
    component: OrdersComponent
  },
  {
    path: "orders-details",
    component: OrdersDetailsComponent
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
