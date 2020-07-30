const { settings } = require("../controllers");

const routes = (app) => {
  app.get("/", (req, res) => res.send("Hello"));

  //Change to post and send tokens to add more security to this function
  app.post("/getsettings", settings.getSettings);

  app.post("/setsettings", settings.setSettings);

  app.post("/register", settings.register);

  app.post("/login", settings.login);
};

module.exports = {
  routes,
};