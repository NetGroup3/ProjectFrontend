import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupPageComponent} from "./modules/auth/pages/signup-page/signup-page.component";
import {LoginPageComponent} from "./modules/auth/pages/login-page/login-page.component";


const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
