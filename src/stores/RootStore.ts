import { AlertStore } from "./AlertStore";
import { AuthStore } from "./AuthStore";

export class RootStore {
  authStore: AuthStore;
  alertStore: AlertStore;
  constructor() {
    this.authStore = new AuthStore(this);
    this.alertStore = new AlertStore(this);
  }
}
