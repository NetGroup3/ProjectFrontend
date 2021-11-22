import {environment} from "../environments/environment";


export const appLinks={
  production: true,
  login: `${environment.serverUrl}/auth/login`,
  signup: `${environment.serverUrl}/auth/signup`,
  recovery: `${environment.serverUrl}/recovery`,
  users: `${environment.serverUrl}/users`,
  personalInfo: `${environment.serverUrl}/users/personal-information`,
  ingridients:`${environment.serverUrl}/ingredient/page`,
  ingridient:`${environment.serverUrl}/ingredient/id`,
  changePassword: `${environment.serverUrl}/users/change-password`,
}
