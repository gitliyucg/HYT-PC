import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LiushuiComponent} from './liushui.component';
import {WidgetsModule} from '../widgets/widgets.module';
import {ReactiveFormsModule} from '@angular/forms';

const liushuiroot: Routes = [
  {path: '', component: LiushuiComponent},
];

@NgModule({
  imports: [
    CommonModule,
    WidgetsModule,
    ReactiveFormsModule,
    RouterModule.forChild(liushuiroot)
  ],
  declarations: [LiushuiComponent]
})
export class LiushuiModule { }
