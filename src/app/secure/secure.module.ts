import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureComponent } from './secure.component';
import {WidgetsModule} from '../widgets/widgets.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { InfoComponent } from './info/info.component';
import { SecondComponent } from './second/second.component';

const router: Routes = [
  {path: '', component: SecureComponent},
  {path: 'info', component: InfoComponent},
  {path: 'second', component: SecondComponent},
];

@NgModule({
  imports: [
    CommonModule,
    WidgetsModule,
    ReactiveFormsModule,
    RouterModule.forChild(router)
  ],
  declarations: [SecureComponent, InfoComponent, SecondComponent]
})
export class SecureModule { }
