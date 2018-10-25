import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyComponent } from './buy.component';
import {WidgetsModule} from '../widgets/widgets.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

const router: Routes = [
  {path: '',
    children: [
      {path: '/:id', component: BuyComponent},
      {path: '**', component: BuyComponent},
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    WidgetsModule,
    ReactiveFormsModule,
    RouterModule.forChild(router)
  ],
  declarations: [BuyComponent]
})
export class BuyModule { }
