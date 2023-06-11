import { RootStore } from "./RootStore";
import jwtDecode from "jwt-decode";
import { makeAutoObservable } from "mobx";
export enum TOKEN_TYPE {
  AUTH = "accessToken",
  REFRESH = "refreshToken",
}
enum Role {
  user,
  admin,
}

interface Payload {
  sub: number;
  username: string;
  role: Role;
  status: string;
  confirmationStatus: string;
  emailVerified: boolean;
}

export class AuthStore {
  rootStore: RootStore;
  isAuth: boolean = false;
  role: Role = Role.user;
  payload?: Payload;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    if (
      localStorage.getItem(TOKEN_TYPE.AUTH) &&
      localStorage.getItem(TOKEN_TYPE.REFRESH)
    ) {
      const authToken = localStorage.getItem(TOKEN_TYPE.AUTH);
      const refreshToken = localStorage.getItem(TOKEN_TYPE.REFRESH);
      if (authToken && refreshToken) {
        this.isAuth = true;
        this.payload = jwtDecode(authToken) as Payload;
      }
    }
  }

  setToken(auth: string, refresh: string) {
    this.isAuth = true;

    localStorage.setItem(TOKEN_TYPE.AUTH, auth);
    localStorage.setItem(TOKEN_TYPE.REFRESH, refresh);

    this.payload = jwtDecode(auth) as Payload;
  }
  getIsAuth() {
    return this.isAuth;
  }

  clearToken() {
    this.isAuth = false;

    localStorage.removeItem(TOKEN_TYPE.AUTH);
    localStorage.removeItem(TOKEN_TYPE.REFRESH);
  }
}
