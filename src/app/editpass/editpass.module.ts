import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditpassComponent} from './editpass.component';
import {RouterModule, Routes} from '@angular/router';
import {WidgetsModule} from '../widgets/widgets.module';
import {ReactiveFormsModule} from '@angular/forms';

const editpass: Routes = [
  {path: '', component: EditpassComponent},
];


@NgModule({
  imports: [
    CommonModule,
    WidgetsModule,
    ReactiveFormsModule,
    RouterModule.forChild(editpass)
  ],
  declarations: [EditpassComponent]
})
export class EditpassModule { }
