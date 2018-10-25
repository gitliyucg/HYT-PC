import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnComponent } from './ann.component';
import { ViewComponent } from './view/view.component';
import {WidgetsModule} from '../widgets/widgets.module';
import {RouterModule, Routes} from '@angular/router';

const router: Routes = [
  {path: '',
    children: [
      {path: 'view/:id', component: ViewComponent},
      {path: '**', component: AnnComponent},
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    WidgetsModule,
    RouterModule.forChild(router)
  ],
  declarations: [AnnComponent, ViewComponent]
})
export class AnnModule { }
