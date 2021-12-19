import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {SignupPageComponent} from './modules/auth/pages/signup-page/signup-page.component';
import {LoginPageComponent} from './modules/auth/pages/login-page/login-page.component';
import {RecoveryPageComponent} from './modules/auth/pages/recovery-page/recovery-page.component';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {en_US} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IconsProviderModule} from './modules/core/icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzFormModule} from "ng-zorro-antd/form";
import {RestapiService} from "./modules/auth/services/rest/restapi.service";
import {HomeComponent} from './modules/cocktails/home/home.component';
import {UserSceletonComponent} from './modules/core/user-sceleton/user-sceleton.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import {AuthUserSettingsComponent} from './modules/settings/auth-user-settings.component';
import {AuthInterceptor} from "./modules/core/common/interceptors/http-interceptors/auth-interceptor";
import {IngredientsComponent} from './modules/cocktails/ingridients/ingredients.component';
import {AddEditIngredientComponent} from './modules/cocktails/add-edit-ingredient/add-edit-ingredient.component';

import {CloudinaryModule} from '@cloudinary/angular';
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import {NgxDropzoneModule} from "ngx-dropzone";

import {ModeratorCocktailsComponent} from "./modules/moderator/moderator-cocktails/moderator-cocktails.component";
import {ModeratorIngredientsComponent} from "./modules/moderator/moderator-ingredients/moderator-ingredients.component";
import {ModeratorKitchenwareComponent} from "./modules/moderator/moderator-kitchenware/moderator-kitchenware.component";
import {AdminModeratorsComponent} from "./modules/admin/admin-moderators/admin-moderators.component";
import {AddEditModeratorComponent} from "./modules/admin/add-edit-moderator/add-edit-moderator.component";
import {KitchenwareComponent} from './modules/cocktails/kitchenware/kitchenware.component';
import {AddEditKitchenwareComponent} from './modules/cocktails/add-edit-kitchenware/add-edit-kitchenware.component';
import {UploadImageComponent} from "./modules/settings/upload-image/upload-image.component";
import {PersonalInformationComponent} from "./modules/settings/personal-information/personal-information.component";
import {ChangePasswordComponent} from "./modules/settings/change-password/change-password.component";
import {PicturePipe} from "./modules/core/picture.pipe";
import {DishComponent} from './modules/cocktails/dish/dish.component';
import {AddEditDishComponent} from './modules/cocktails/add-edit-dish/add-edit-dish.component';
import {PersonalStockComponent} from "./modules/cocktails/personal-stock/personal-stock.component";
import {FooterComponent} from "./modules/core/footer/footer.component";
import {SidebarComponent} from "./modules/core/sidebar/sidebar.component";
import {HeaderComponent} from "./modules/core/header/header.component";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {NzListModule} from "ng-zorro-antd/list";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {DishInfoComponent} from './modules/cocktails/dish/dish-info/dish-info.component';
import {ButtonComponent} from './components/button/button.component';
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {AddStockComponent} from "./modules/cocktails/personal-stock/add-stock/add-stock.component";
import {StockItemComponent} from './modules/cocktails/personal-stock/stock-item/stock-item.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NzCommentModule} from "ng-zorro-antd/comment";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";

import {NzTransferModule} from "ng-zorro-antd/transfer";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {ListComponent} from './modules/cocktails/list/list.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzTagModule} from "ng-zorro-antd/tag";
import {ListKitchenwareComponent} from './modules/cocktails/list-kitchenware/list-kitchenware.component';
import {ListLabelComponent} from './modules/cocktails/list-label/list-label.component';
import {RequestsComponent} from "./modules/friends/pages/friends-requests/requests.component";
import {FriendsComponent} from "./modules/friends/pages/friends/friends.component";
import {PageNotFoundComponent} from "./modules/core/page-not-found/page-not-found.component";
import {NzResultModule} from "ng-zorro-antd/result";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CommentsComponent} from './modules/cocktails/dish/comments/comments.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {UserSearchComponent} from "./modules/user/components/searchUser/user-search.component";
import {NzAutocompleteModule} from "ng-zorro-antd/auto-complete";
import {UserProfileComponent} from "./modules/user/pages/profile/profile.component";
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzAlertModule} from "ng-zorro-antd/alert";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from "@angular/material/button";
import { UserCocktailsComponent } from './modules/user/pages/user-cocktails/user-cocktails.component';
import { RecommendDishComponent } from './modules/cocktails/personal-stock/recommend-dish/recommend-dish.component';
import { DishItemComponent } from './modules/cocktails/personal-stock/recommend-dish/dish-item/dish-item.component';
import { FavouriteComponent } from './modules/cocktails/favourite/favourite.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {TrimPipe} from "./modules/core/trim.pipe";
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
    IngredientsComponent,
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
    AddEditModeratorComponent,
    PersonalStockComponent,
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    ListComponent,
    ListKitchenwareComponent,
    ListLabelComponent,
    ListComponent,
    ListKitchenwareComponent,
    ListLabelComponent,
    StockItemComponent,
    DishInfoComponent,
    AddStockComponent,
    ButtonComponent,
    RequestsComponent,
    FriendsComponent,
    PageNotFoundComponent,
    CommentsComponent,
    UserSearchComponent,
    UserProfileComponent,
    UserCocktailsComponent,
    RecommendDishComponent,
    DishItemComponent,
    FavouriteComponent,
    TrimPipe,
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
    NzInputNumberModule,
    FontAwesomeModule,
    NzCommentModule,
    NzAvatarModule,
    NzTransferModule,
    NzSwitchModule,
    NzTableModule,
    NzTagModule,
    NzResultModule,
    InfiniteScrollModule,
    ScrollingModule,
    NzNotificationModule,
    NzSpinModule,
    NzDatePickerModule,
    NzSpaceModule,
    NzToolTipModule,
    NzBadgeModule,
    NzAutocompleteModule,
    NzDescriptionsModule,
    NzAlertModule,
    NzPaginationModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: NZ_I18N,
      useValue: en_US
    },
    RestapiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
