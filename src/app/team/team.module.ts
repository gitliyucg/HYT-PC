import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TeamComponent} from './team.component';
import {RegisterComponent} from './register/register.component';
import {RouterModule, Routes} from '@angular/router';
import {WidgetsModule} from '../widgets/widgets.module';
import {ReactiveFormsModule} from '@angular/forms';

const router: Routes = [
  {
    path: '',
    children: [
      {path: '', component: TeamComponent},
      {path: 'register', component: RegisterComponent}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    WidgetsModule,
    ReactiveFormsModule,
    RouterModule.forChild(router)
  ],
  declarations: [TeamComponent, RegisterComponent]
})
export class TeamModule { }
