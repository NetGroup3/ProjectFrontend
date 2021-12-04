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
import { IconsProviderModule } from './modules/core/icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import {NzFormModule} from "ng-zorro-antd/form";
import {RestapiService} from "./modules/auth/services/rest/restapi.service";
import { HomeComponent } from './modules/cocktails/home/home.component';
import { UserSceletonComponent } from './modules/core/user-sceleton/user-sceleton.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import { AuthUserSettingsComponent } from './modules/settings/auth-user-settings.component';
import {AuthInterceptor} from "./http-interceptors/auth-interceptor";
import { IngridientsComponent } from './modules/cocktails/ingridients/ingridients.component';
import { AddEditIngredientComponent } from './modules/cocktails/add-edit-ingredient/add-edit-ingredient.component';

import {CloudinaryModule} from '@cloudinary/angular';

import {NgxDropzoneModule} from "ngx-dropzone";

import {ModeratorCocktailsComponent} from "./modules/moderator/moderator-cocktails/moderator-cocktails.component";
import {ModeratorIngredientsComponent} from "./modules/moderator/moderator-ingredients/moderator-ingredients.component";
import {ModeratorKitchenwareComponent} from "./modules/moderator/moderator-kitchenware/moderator-kitchenware.component";
import {AdminModeratorsComponent} from "./modules/admin/admin-moderators/admin-moderators.component";
import {EditModeratorComponent} from "./modules/admin/edit-moderator/edit-moderator.component";
import {KitchenwareComponent} from './modules/cocktails/kitchenware/kitchenware.component';
import {AddEditKitchenwareComponent} from './modules/cocktails/add-edit-kitchenware/add-edit-kitchenware.component';
import {UploadImageComponent} from "./modules/settings/upload-image/upload-image.component";
import {PersonalInformationComponent} from "./modules/settings/personal-information/personal-information.component";
import {ChangePasswordComponent} from "./modules/settings/change-password/change-password.component";
import {PicturePipe} from "./modules/core/picture.pipe";
import { DishComponent } from './modules/cocktails/dish/dish.component';
import { AddEditDishComponent } from './modules/cocktails/add-edit-dish/add-edit-dish.component';
import {PersonalStockComponent} from "./modules/cocktails/personal-stock/personal-stock.component";
import {FooterComponent} from "./modules/core/footer/footer.component";
import {SidebarComponent} from "./modules/core/sidebar/sidebar.component";
import {HeaderComponent} from "./modules/core/header/header.component";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {NzListModule} from "ng-zorro-antd/list";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzTransferModule} from "ng-zorro-antd/transfer";
import {NzSwitchModule} from "ng-zorro-antd/switch";

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
    NzSkeletonModule,
    NzListModule,
    NzPopconfirmModule,
    NzTransferModule,
    NzSwitchModule,
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
