import {environment} from "../environments/environment";


export const appLinks={
 // production: true,
  login: `${environment.serverUrl}/auth/login`,
  signup: `${environment.serverUrl}/auth/signup`,
  recovery: `${environment.serverUrl}/recovery`,
  users: `${environment.serverUrl}/users`,
  personalInfo: `${environment.serverUrl}/users/personal-information`,
  ingredients:`${environment.serverUrl}/ingredient/page`,
  ingredient:`${environment.serverUrl}/ingredient`,
  changePassword: `${environment.serverUrl}/users/change-password`,
  Kitchenware: `${environment.serverUrl}/kitchenware/page`,
  kitchenware: `${environment.serverUrl}/kitchenware`,
  userImage:`${environment.serverUrl}/users/user-image`,
 // uploadImage:`https://api.cloudinary.com/v1_1/djcak19nu/image/upload`,

}
