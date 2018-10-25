import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {WidgetsModule} from '../widgets/widgets.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RechargeComponent} from './recharge.component';
import {FileUploadModule} from 'ng2-file-upload';

const router: Routes = [
  {path: '', component: RechargeComponent},
];

@NgModule({
  imports: [
    CommonModule,
    WidgetsModule,
    ReactiveFormsModule,
    FileUploadModule,
    RouterModule.forChild(router)
  ],
  declarations: [RechargeComponent]
})
export class RechargeModule { }
