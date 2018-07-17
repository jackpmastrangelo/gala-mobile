import { galaAxios } from "./galaApi";

export default class AccountApi {

  static createAccount(firstName, lastName, email, password) {
    return galaAxios.post("/accounts", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    });
  }

  static login(email, password) {
    return galaAxios.post("/accounts/login", {
      email: email,
      password: password
    });
  }
}