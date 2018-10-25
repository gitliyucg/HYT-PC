import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FooterComponent } from './footer/footer.component';
import { EditorComponent } from './editor/editor.component';
import { FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import { VerifyPassComponent } from './verify-pass/verify-pass.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FroalaEditorModule,
    FroalaViewModule
  ],
  declarations: [HeaderComponent, PaginationComponent, FooterComponent, EditorComponent, VerifyPassComponent],
  exports: [
    CommonModule,
    PaginationComponent,
    HeaderComponent,
    FooterComponent,
    EditorComponent,
    VerifyPassComponent
  ],
})
export class WidgetsModule { }
