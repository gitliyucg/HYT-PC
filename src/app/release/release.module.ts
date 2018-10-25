import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleaseComponent } from './release.component';
import {WidgetsModule} from "../widgets/widgets.module";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

const router: Routes = [
  {path: '', component: ReleaseComponent},
];

@NgModule({
  imports: [
    CommonModule,
    WidgetsModule,
    ReactiveFormsModule,
    RouterModule.forChild(router)
  ],
  declarations: [ReleaseComponent]
})
export class ReleaseModule { }
