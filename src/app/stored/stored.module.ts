import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {WidgetsModule} from '../widgets/widgets.module';
import {StoredComponent} from './stored.component';

const router: Routes = [
  {path: '', component: StoredComponent},
];

@NgModule({
  imports: [
    CommonModule,
    WidgetsModule,
    RouterModule.forChild(router)
  ],
  declarations: [StoredComponent]
})
export class StoredModule { }
