import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupPageComponent} from "./modules/auth/pages/signup-page/signup-page.component";
import {LoginPageComponent} from "./modules/auth/pages/login-page/login-page.component";
import {RecoveryPageComponent} from "./modules/auth/pages/recovery-page/recovery-page.component";
import {HomeComponent} from "./home/home.component";
import {AuthUserSettingsComponent} from "./settings/auth-user-settings.component";
import {IngridientsComponent} from "./ingridients/ingridients.component";
import {AddEditIngredientComponent} from "./add-edit-ingredient/add-edit-ingredient.component";
import { HomeGuard} from "./home.guard.";
import {ModeratorIngredientsComponent} from "./moderator/moderator-ingredients/moderator-ingredients.component";
import {ModeratorKitchenwareComponent} from "./moderator/moderator-kitchenware/moderator-kitchenware.component";
import {ModeratorCocktailsComponent} from "./moderator/moderator-cocktails/moderator-cocktails.component";
import {AdminModeratorsComponent} from "./admin/admin-moderators/admin-moderators.component";
import {AddEditKitchenwareComponent} from "./add-edit-kitchenware/add-edit-kitchenware.component";
import {AddEditDishComponent} from "./add-edit-dish/add-edit-dish.component";
import {PersonalStockComponent} from "./personal-stock/personal-stock.component";


const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'recovery', component: RecoveryPageComponent },
  { path: 'home', component:HomeComponent, canActivate: [HomeGuard]},
  // { path: 'home', component:HomeComponent},
  { path: 'settings', component:AuthUserSettingsComponent},
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[HomeGuard]
})
export class AppRoutingModule { }
