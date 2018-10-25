import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrcodeComponent } from './qrcode.component';
import {RouterModule, Routes} from '@angular/router';
import {WidgetsModule} from '../widgets/widgets.module';
import {ReactiveFormsModule} from '@angular/forms';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import {ClipboardModule} from 'ngx-clipboard';

const root: Routes = [
  {path: '', component: QrcodeComponent},
];

@NgModule({
  imports: [
    CommonModule,
    WidgetsModule,
    ReactiveFormsModule,
    NgxQRCodeModule,
    ClipboardModule,
    RouterModule.forChild(root)
  ],
  declarations: [QrcodeComponent]
})
export class QrcodeModule { }
