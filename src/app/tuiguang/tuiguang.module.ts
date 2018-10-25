import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiguangComponent } from './tuiguang.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {WidgetsModule} from '../widgets/widgets.module';

const root: Routes = [
    {path: '', component: TuiguangComponent},
    {path: ':tg', component: TuiguangComponent},
];

@NgModule({
  imports: [
    CommonModule,
    WidgetsModule,
    ReactiveFormsModule,
    RouterModule.forChild(root)
  ],
  declarations: [TuiguangComponent]
})
export class TuiguangModule { }
