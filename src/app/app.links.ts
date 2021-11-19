import {environment} from "../environments/environment";


export const appLinks={
  production: true,
  login: `${environment.serverUrl}/auth/login`,
  signup: `${environment.serverUrl}/auth/signup`,
  recovery: `${environment.serverUrl}/recovery`,
  users: `${environment.serverUrl}/users`,
  personalInfo: `${environment.serverUrl}/personal-information`,
}

