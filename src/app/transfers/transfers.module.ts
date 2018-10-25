import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransfersComponent } from './transfers.component';
import {RouterModule, Routes} from '@angular/router';
import {WidgetsModule} from '../widgets/widgets.module';
import {ReactiveFormsModule} from '@angular/forms';

const router: Routes = [
  {path: '', component: TransfersComponent}
];

@NgModule({
  imports: [
    CommonModule,
    WidgetsModule,
    ReactiveFormsModule,
    RouterModule.forChild(router)
  ],
  declarations: [TransfersComponent]
})
export class TransfersModule { }
