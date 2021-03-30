import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmitOrderComponent } from './guest/submit-order/submit-order.component';
import { WatchOrderComponent } from './guest/watch-order/watch-order.component';
import { ListAllComponent } from './staff/list-all/list-all.component';

const routes: Routes = [
  { path: 'guest', component: WatchOrderComponent },
  { path: 'guest/order', component: SubmitOrderComponent },
  { path: 'staff', component: ListAllComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
