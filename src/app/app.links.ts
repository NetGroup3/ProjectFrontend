import {environment} from "../environments/environment";


export const appLinks={
  production: true,
  login: `${environment.serverUrl}/auth/login`,
  signup: `${environment.serverUrl}/auth/signup`,
  recovery: `${environment.serverUrl}/recovery`,
  users: `${environment.serverUrl}/users`,
  personalInfo: `${environment.serverUrl}/users/personal-information`,
  userImage:`${environment.serverUrl}/users/user-image`,
  ingredients:`${environment.serverUrl}/ingredient/page`,
  ingredient:`${environment.serverUrl}/ingredient/id`,
  changePassword: `${environment.serverUrl}/users/change-password`,
  moderatorList: `${environment.serverUrl}/admin/moderators`,
  moderator: `${environment.serverUrl}/moderator`
}
