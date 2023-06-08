import { RootStore } from "./RootStore";
import { makeAutoObservable } from "mobx";

enum TOKEN_TYPE {
  AUTH = "accessToken",
  REFRESH = "refreshToken",
}

export class AuthStore {
  rootStore: RootStore;
  isAuth: boolean = false;
  authToken?: string;
  refreshToken?: string;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    if (
      localStorage.getItem(TOKEN_TYPE.AUTH) &&
      localStorage.getItem(TOKEN_TYPE.REFRESH)
    ) {
      this.authToken = localStorage.getItem(TOKEN_TYPE.AUTH)!;
      this.refreshToken = localStorage.getItem(TOKEN_TYPE.REFRESH)!;
      this.isAuth = true;
    }
  }

  setToken(auth: string, refresh: string) {
    this.isAuth = true;
    this.authToken = auth;
    this.refreshToken = refresh;
    localStorage.setItem(TOKEN_TYPE.AUTH, auth);
    localStorage.setItem(TOKEN_TYPE.REFRESH, auth);
  }
  getIsAuth() {
    return this.isAuth;
  }

  clearToken() {
    this.isAuth = false;
    this.authToken = undefined;
    this.refreshToken = undefined;
    localStorage.removeItem(TOKEN_TYPE.AUTH);
    localStorage.removeItem(TOKEN_TYPE.REFRESH);
  }
}
