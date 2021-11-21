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


const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'recovery', component: RecoveryPageComponent },
  { path: 'home', component:HomeComponent},
  { path: 'user/blog', component:AuthUserBlogComponent},
  { path: 'user/calendar', component:AuthUserCalendarComponent},
  { path: 'user/catalogue', component:AuthUserCatalogueComponent},
  { path: 'user/events', component:AuthUserEventsComponent},
  { path: 'user/favourite', component:AuthUserFavouriteComponent},
  { path: 'user/friends', component:AuthUserFriendsComponent},
  { path: 'user/settings', component:AuthUserSettingsComponent},
  { path: 'moderator/ingridients', component:IngridientsComponent},
  { path: 'moderator/ingridients/:id', component:AddEditIngredientComponent},
  { path: 'moderator/ingridients/add', component:AddEditIngredientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
