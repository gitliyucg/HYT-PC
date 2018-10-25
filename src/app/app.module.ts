import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FileUploadModule} from 'ng2-file-upload';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {WidgetsModule} from './widgets/widgets.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {AuthGuard} from './auth-guard.service';
import {Interceptor} from './Interceptor';
import {IndexComponent} from './index/index.component';
import {ClipboardModule} from 'ngx-clipboard';

const root: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', loadChildren: './tuiguang/tuiguang.module#TuiguangModule'},
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {path: 'index', component: IndexComponent},
      {path: 'editpass', loadChildren: './editpass/editpass.module#EditpassModule', canLoad: [AuthGuard]},
      // canLoad会保护路由守卫的惰性加载，不能被预加载
      {path: 'team', loadChildren: './team/team.module#TeamModule'},
      {path: 'recharge', loadChildren: './recharge/recharge.module#RechargeModule'},
      {path: 'liushui', loadChildren: './liushui/liushui.module#LiushuiModule'},
      {path: 'stored', loadChildren: './stored/stored.module#StoredModule'},
      {path: 'buy', loadChildren: './buy/buy.module#BuyModule'},
      {path: 'give', loadChildren: './give/give.module#GiveModule'},
      {path: 'transfers', loadChildren: './transfers/transfers.module#TransfersModule'},
      {path: 'qrcode', loadChildren: './qrcode/qrcode.module#QrcodeModule'},
      {path: 'release', loadChildren: './release/release.module#ReleaseModule'},
      {path: 'secure', loadChildren: './secure/secure.module#SecureModule'},
      {path: 'ann', loadChildren: './ann/ann.module#AnnModule'},
      {path: 'trading', loadChildren: './trading/trading.module#TradingModule'},
      {path: '**', component: IndexComponent}
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    WidgetsModule,
    FileUploadModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    ClipboardModule,
    RouterModule.forRoot(root, {preloadingStrategy: PreloadAllModules})
  ],
  providers: [AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
