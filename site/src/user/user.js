import { email } from "../private/email";

class User {
  constructor() {
    this.authenticated = true;
    this.email = email;
  }

  setAuthentication(state) {
    this.authenticated = state;
  }

  isAuthenticated() {
    return this.authenticated;
  }

  getEmail() {
    return this.email;
  }
  setEmail(email) {
    this.email = email;
  }
}

export default new User();
