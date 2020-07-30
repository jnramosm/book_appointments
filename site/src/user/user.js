class User {
  constructor() {
    this.authenticated = false;
    this.email = "test1@test.com";
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
