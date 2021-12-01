import {environment} from "../environments/environment";


export const appLinks={
  production: true,
  login: `${environment.serverUrl}/auth/login`,
  signup: `${environment.serverUrl}/auth/signup`,
  recovery: `${environment.serverUrl}/recovery`,
  users: `${environment.serverUrl}/users`,
  personalInfo: `${environment.serverUrl}/users/personal-information`,
  moderatorList: `${environment.serverUrl}/admin/moderators`,
  moderator: `${environment.serverUrl}/moderator`,
  ingredients:`${environment.serverUrl}/ingredient/search`,
  ingredient:`${environment.serverUrl}/ingredient`,
  changePassword: `${environment.serverUrl}/users/change-password`,
  Kitchenware: `${environment.serverUrl}/kitchenware/search`,
  kitchenware: `${environment.serverUrl}/kitchenware`,
  userImage:`${environment.serverUrl}/users/user-image`,
  uploadImage:`https://api.cloudinary.com/v1_1/djcak19nu/image/upload`,
  dishes:`${environment.serverUrl}/dish/page`,
  stock:`${environment.serverUrl}/user/stock`,
  dish:`${environment.serverUrl}/dish`,
  label: `${environment.serverUrl}/dish/label/edit`,
  dishIngredient:`${environment.serverUrl}/dish/ingredient`,
  dishKitchenware:`${environment.serverUrl}/dish/kitchenware`
}
