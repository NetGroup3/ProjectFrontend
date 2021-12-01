import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

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
import {NzFormModule} from "ng-zorro-antd/form";
import {RestapiService} from "./modules/auth/services/rest/restapi.service";
import { HomeComponent } from './home/home.component';
import { UserSceletonComponent } from './sceletons/user-sceleton/user-sceleton.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import { AuthUserSettingsComponent } from './auth-user/auth-user-settings/auth-user-settings.component';
import {AuthInterceptor} from "./http-interceptors/auth-interceptor";
import { IngridientsComponent } from './ingridients/ingridients.component';
import { AddEditIngredientComponent } from './add-edit-ingredient/add-edit-ingredient.component';

import {CloudinaryModule} from '@cloudinary/angular';

import {NgxDropzoneModule} from "ngx-dropzone";

import {ModeratorCocktailsComponent} from "./moderator/moderator-cocktails/moderator-cocktails.component";
import {ModeratorIngredientsComponent} from "./moderator/moderator-ingredients/moderator-ingredients.component";
import {ModeratorKitchenwareComponent} from "./moderator/moderator-kitchenware/moderator-kitchenware.component";
import {AdminModeratorsComponent} from "./admin/admin-moderators/admin-moderators.component";
import {EditModeratorComponent} from "./admin/edit-moderator/edit-moderator.component";
import {KitchenwareComponent} from './kitchenware/kitchenware.component';
import {AddEditKitchenwareComponent} from './add-edit-kitchenware/add-edit-kitchenware.component';
import {UploadImageComponent} from "./auth-user/auth-user-settings/upload-image/upload-image.component";
import {PersonalInformationComponent} from "./auth-user/auth-user-settings/personal-information/personal-information.component";
import {ChangePasswordComponent} from "./auth-user/auth-user-settings/change-password/change-password.component";
import {PicturePipe} from "./picture.pipe";
import { DishComponent } from './dish/dish.component';
import { AddEditDishComponent } from './add-edit-dish/add-edit-dish.component';
import {PersonalStockComponent} from "./personal-stock/personal-stock.component";
import {FooterComponent} from "./modules/footer/footer.component";
import {SidebarComponent} from "./sceletons/sidebar/sidebar.component";
import {HeaderComponent} from "./sceletons/header/header.component";

registerLocaleData(en);

@NgModule({

  declarations: [
    AppComponent,
    SignupPageComponent,
    LoginPageComponent,
    RecoveryPageComponent,
    HomeComponent,
    UserSceletonComponent,
    AuthUserSettingsComponent,
    IngridientsComponent,
    AddEditIngredientComponent,
    ModeratorIngredientsComponent,
    ModeratorKitchenwareComponent,
    ModeratorCocktailsComponent,
    AdminModeratorsComponent,
    KitchenwareComponent,
    AddEditKitchenwareComponent,
    UploadImageComponent,
    PersonalInformationComponent,
    ChangePasswordComponent,
    PicturePipe,
    DishComponent,
    AddEditDishComponent,
    EditModeratorComponent,
    PersonalStockComponent,
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    NzSelectModule,
    HttpClientModule,
    CloudinaryModule,
    NgxDropzoneModule,
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
    {
      provide: NZ_I18N,
      useValue: en_US
    },
    RestapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
