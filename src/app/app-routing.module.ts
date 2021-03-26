import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';


const appRoutes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "order",
    component: OrderComponent
  },
  {
    path: "cart",
    component: CartComponent
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
