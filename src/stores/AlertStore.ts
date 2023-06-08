import { RootStore } from "./RootStore";
import { makeAutoObservable } from "mobx";

export enum AlertType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export class AlertStore {
  rootStore: RootStore;
  isAlert: boolean = false;
  message: string = "";
  type: AlertType = AlertType.SUCCESS;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }
  clearMessage() {
    this.isAlert = false;
    this.message = "";
  }
  setMessage(message: string, type?: AlertType) {
    this.isAlert = true;
    this.message = message;
    this.type = type || AlertType.SUCCESS;
  }
  getMessage() {
    return this.message;
  }
  getAlertType() {
    return this.type;
  }
}
