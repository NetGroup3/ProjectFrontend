import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SignupPageComponent } from './modules/auth/pages/signup-page/signup-page.component';
import { LoginPageComponent } from './modules/auth/pages/login-page/login-page.component';
import { RecoveryPageComponent } from './modules/auth/pages/recovery-page/recovery-page.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import {NzFormControlComponent, NzFormModule} from "ng-zorro-antd/form";
import {RestapiService} from "./modules/auth/services/rest/restapi.service";
import { HomeComponent } from './home/home.component';
import { UserSceletonComponent } from './sceletons/user-sceleton/user-sceleton.component';
import {NzSelectModule} from "ng-zorro-antd/select";



registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SignupPageComponent,
    LoginPageComponent,
    RecoveryPageComponent,
    HomeComponent,
    UserSceletonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    NzSelectModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, RestapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
