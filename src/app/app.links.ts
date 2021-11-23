import {environment} from "../environments/environment";


export const appLinks={
  production: true,
  login: `${environment.serverUrl}/auth/login`,
  signup: `${environment.serverUrl}/auth/signup`,
  recovery: `${environment.serverUrl}/recovery`,
  users: `${environment.serverUrl}/users`,
  personalInfo: `${environment.serverUrl}/users/personal-information`,
  ingridients:`${environment.serverUrl}/ingridients`,
  ingridient:`${environment.serverUrl}/ingridients/id`,
  userImage:`${environment.serverUrl}/users/user-image`,
}
