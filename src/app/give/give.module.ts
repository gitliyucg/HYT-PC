import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiveComponent } from './give.component';
import {WidgetsModule} from '../widgets/widgets.module';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

const router: Routes = [
  {path: '', component: GiveComponent},
];

@NgModule({
  imports: [
    CommonModule,
    WidgetsModule,
    ReactiveFormsModule,
    RouterModule.forChild(router)
  ],
  declarations: [GiveComponent]
})
export class GiveModule { }
