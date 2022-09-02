import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {LoginPageComponent} from './login-page/login-page.component';
import {LoginPageRoutingModule} from './login-routing.module';
import {TranslocoModule} from '@ngneat/transloco';


@NgModule({
  declarations: [
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    TranslocoModule,
    ReactiveFormsModule
  ]
})
export class LoginModule {
}
