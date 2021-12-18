import {environment} from "../environments/environment";


export const appLinks={
  production: true,
  login: `${environment.serverUrl}/auth/login`,
  signup: `${environment.serverUrl}/auth/signup`,
  recovery: `${environment.serverUrl}/auth/recovery`,
  code: `${environment.serverUrl}/auth/code`,
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
  dishes:`${environment.serverUrl}/dish/list`,
  stock:`${environment.serverUrl}/user/stock`,
  dish:`${environment.serverUrl}/dish`,
  delete:`${environment.serverUrl}/dish`,
  label: `${environment.serverUrl}/dish/label/edit`,
  dishIngredient:`${environment.serverUrl}/dish/ingredient`,
  dishKitchenware:`${environment.serverUrl}/dish/kitchenware`,
  dishLike:`${environment.serverUrl}/dish/like`,
  labels:`${environment.serverUrl}/dish/label/edit`,
  friends: `${environment.serverUrl}/friend/friends`,
  delFriend: `${environment.serverUrl}/friend/remove-friend`,
  requests: `${environment.serverUrl}/friend/requests`,
  declineInvite: `${environment.serverUrl}/friend/decline-invite`,
  acceptInvite: `${environment.serverUrl}/friend/accept-invite`,
  addFriend: `${environment.serverUrl}/friend/send-invite`,
  stockIngredients:`${environment.serverUrl}/user/stock/ingredients`,
  comment: `${environment.serverUrl}/dish/comment`,
  commentList: `${environment.serverUrl}/dish/comments`,
  addDish: `${environment.serverUrl}/dish/full`,
  searchByIngredients:  `${environment.serverUrl}/dish/ingredients`,
  stockSearch:`${environment.serverUrl}/user/stock/search`,
  stockPages:`${environment.serverUrl}/user/stock/pages`,
  userSearch: `${environment.serverUrl}/users/user-search`,
  userProfile: `${environment.serverUrl}/users/user-profile`,
  recommendDish: `${environment.serverUrl}/dish/recommend`,
  favourite:`${environment.serverUrl}/dish/favourite`,

}
