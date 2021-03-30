import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOrderComponent } from './guest/list-order/list-order.component';
import { SubmitOrderComponent } from './guest/submit-order/submit-order.component';

const routes: Routes = [
  { path: 'guest', component: ListOrderComponent },
  { path: 'guest/order', component: SubmitOrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
