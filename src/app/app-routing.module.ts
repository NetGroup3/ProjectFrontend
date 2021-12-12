import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupPageComponent} from "./modules/auth/pages/signup-page/signup-page.component";
import {LoginPageComponent} from "./modules/auth/pages/login-page/login-page.component";
import {RecoveryPageComponent} from "./modules/auth/pages/recovery-page/recovery-page.component";
import {HomeComponent} from "./modules/cocktails/home/home.component";
import {AuthUserSettingsComponent} from "./modules/settings/auth-user-settings.component";
import {IngridientsComponent} from "./modules/cocktails/ingridients/ingridients.component";
import {AddEditIngredientComponent} from "./modules/cocktails/add-edit-ingredient/add-edit-ingredient.component";
import {HomeGuard} from "./modules/core/home.guard.";
import {ModeratorIngredientsComponent} from "./modules/moderator/moderator-ingredients/moderator-ingredients.component";
import {ModeratorKitchenwareComponent} from "./modules/moderator/moderator-kitchenware/moderator-kitchenware.component";
import {ModeratorCocktailsComponent} from "./modules/moderator/moderator-cocktails/moderator-cocktails.component";
import {AdminModeratorsComponent} from "./modules/admin/admin-moderators/admin-moderators.component";
import {AddEditKitchenwareComponent} from "./modules/cocktails/add-edit-kitchenware/add-edit-kitchenware.component";
import {AddEditDishComponent} from "./modules/cocktails/add-edit-dish/add-edit-dish.component";
import {PersonalStockComponent} from "./modules/cocktails/personal-stock/personal-stock.component";
import {DishComponent} from  "./modules/cocktails/dish/dish.component";
import {UserDishComponent} from "./modules/cocktails/dish/user-dish/user-dish.component";
import {ListComponent} from "./modules/cocktails/list/list.component";
import {ListKitchenwareComponent} from "./modules/cocktails/list-kitchenware/list-kitchenware.component";
import {PageNotFoundComponent} from "./modules/core/page-not-found/page-not-found.component";
import {FriendsComponent} from "./modules/friends/pages/friends/friends.component";
import {RequestsComponent} from "./modules/friends/pages/friends-requests/requests.component";
import {UserSearchComponent} from "./modules/user/components/searchUser/user-search.component";
import {UserProfileComponent} from "./modules/user/pages/profile/profile.component";



const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'recovery', component: RecoveryPageComponent },
  { path: 'home', component:HomeComponent, canActivate: [HomeGuard]},
  // { path: 'home', component:HomeComponent},
  { path: 'settings', component:AuthUserSettingsComponent},
  { path: 'user/friends', component:FriendsComponent},
  { path: 'user/requests', component:RequestsComponent},
  { path: 'user/user-search', component:UserSearchComponent},
  { path: 'user/user-profile/:id', component:UserProfileComponent},
  { path: 'moderator/ingredients', component:ModeratorIngredientsComponent},
  { path: 'moderator/ingredients/:id', component:AddEditIngredientComponent},
  { path: 'moderator/ingredients/add', component:AddEditIngredientComponent},
  { path: 'moderator/cocktails', component: ModeratorCocktailsComponent},
  { path: 'moderator/dish/:id', component:AddEditDishComponent},
  { path: 'moderator/dish/add', component:AddEditDishComponent},
  { path: 'moderator/kitchenware', component: ModeratorKitchenwareComponent},
  { path: 'moderator/kitchenware/add', component: AddEditKitchenwareComponent},
  { path: 'moderator/kitchenware/:id', component: AddEditKitchenwareComponent},
  { path: 'admin/moderators', component: AdminModeratorsComponent},
  { path: 'personal-stock', component: PersonalStockComponent},
  { path: 'dishes', component: DishComponent},
  { path: 'user/dish/:id', component: UserDishComponent},
  { path: 'list', component: ListKitchenwareComponent},
  {path: "**", component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[HomeGuard]
})
export class AppRoutingModule { }
