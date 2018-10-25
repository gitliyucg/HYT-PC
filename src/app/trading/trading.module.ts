import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradingComponent } from './trading.component';
import {RouterModule, Routes} from '@angular/router';
import {WidgetsModule} from '../widgets/widgets.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IssueComponent } from './Issue/issue.component';
import { BuyComponent } from './buy/buy.component';
import { OrderComponent } from './order/order.component';
import { OrderviewComponent } from './orderview/orderview.component';
import { SellComponent } from './sell/sell.component';

const router: Routes = [
  {
    path: '',
    children: [
      {path: '', component: TradingComponent},
      {path: 'index', component: TradingComponent},
      {path: 'sell', component: SellComponent},
      {path: 'orders', component: OrderComponent},
      {path: 'buy/:id', component: BuyComponent},
      {path: 'orderview/:id', component: OrderviewComponent},
      {path: 'issue', component: IssueComponent},
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    WidgetsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(router)
  ],
  declarations: [TradingComponent, IssueComponent, BuyComponent, OrderComponent, OrderviewComponent, SellComponent]
})
export class TradingModule { }
