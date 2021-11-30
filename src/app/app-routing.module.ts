import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupPageComponent} from "./modules/auth/pages/signup-page/signup-page.component";
import {LoginPageComponent} from "./modules/auth/pages/login-page/login-page.component";
import {RecoveryPageComponent} from "./modules/auth/pages/recovery-page/recovery-page.component";
import {HomeComponent} from "./home/home.component";
import {AuthUserBlogComponent} from "./auth-user/auth-user-blog/auth-user-blog.component";
import {AuthUserCalendarComponent} from "./auth-user/auth-user-calendar/auth-user-calendar.component";
import {AuthUserCatalogueComponent} from "./auth-user/auth-user-catalogue/auth-user-catalogue.component";
import {AuthUserEventsComponent} from "./auth-user/auth-user-events/auth-user-events.component";
import {AuthUserFavouriteComponent} from "./auth-user/auth-user-favourite/auth-user-favourite.component";
import {AuthUserFriendsComponent} from "./auth-user/auth-user-friends/auth-user-friends.component";
import {AuthUserSettingsComponent} from "./auth-user/auth-user-settings/auth-user-settings.component";
import {IngridientsComponent} from "./ingridients/ingridients.component";
import {AddEditIngredientComponent} from "./add-edit-ingredient/add-edit-ingredient.component";
import { HomeGuard} from "./home.guard.";
import {ModeratorIngredientsComponent} from "./moderator/moderator-ingredients/moderator-ingredients.component";
import {ModeratorKitchenwareComponent} from "./moderator/moderator-kitchenware/moderator-kitchenware.component";
import {ModeratorSettingsComponent} from "./moderator/moderator-settings/moderator-settings.component";
import {ModeratorCocktailsComponent} from "./moderator/moderator-cocktails/moderator-cocktails.component";
import {AdminModeratorsComponent} from "./admin/admin-moderators/admin-moderators.component";
import {AddEditKitchenwareComponent} from "./add-edit-kitchenware/add-edit-kitchenware.component";
import {ModeratorSceletonComponent} from "./sceletons/moderator-sceleton/moderator-sceleton.component";
import {AddEditDishComponent} from "./add-edit-dish/add-edit-dish.component";
import {PersonalStockComponent} from "./personal-stock/personal-stock.component";


const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'recovery', component: RecoveryPageComponent },
  { path: 'home', component:HomeComponent, canActivate: [HomeGuard]},
  // { path: 'home', component:HomeComponent},
  { path: 'user/blog', component:AuthUserBlogComponent},
  { path: 'user/calendar', component:AuthUserCalendarComponent},
  { path: 'user/catalogue', component:AuthUserCatalogueComponent},
  { path: 'user/events', component:AuthUserEventsComponent},
  { path: 'user/favourite', component:AuthUserFavouriteComponent},
  { path: 'user/friends', component:AuthUserFriendsComponent},
  { path: 'user/settings', component:AuthUserSettingsComponent},
  { path: 'moderator', component:ModeratorSceletonComponent},
  { path: 'moderator/ingredients', component:ModeratorIngredientsComponent},
  { path: 'moderator/ingredients/:id', component:AddEditIngredientComponent},
  { path: 'moderator/ingredients/add', component:AddEditIngredientComponent},
  { path: 'moderator/cocktails', component: ModeratorCocktailsComponent},
  { path: 'moderator/dish/:id', component:AddEditDishComponent},
  { path: 'moderator/dish/add', component:AddEditDishComponent},
  { path: 'moderator/kitchenware', component: ModeratorKitchenwareComponent},
  { path: 'moderator/kitchenware/add', component: AddEditKitchenwareComponent},
  { path: 'moderator/kitchenware/:id', component: AddEditKitchenwareComponent},
  { path: 'moderator/settings', component: AuthUserSettingsComponent},
  { path: 'admin/moderators', component: AdminModeratorsComponent},
  { path: 'personal-stock', component: PersonalStockComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[HomeGuard]
})
export class AppRoutingModule { }
