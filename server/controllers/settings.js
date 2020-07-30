const { settings } = require("../models");

//The following two functions should have token validation
const getSettings = (req, res, next) => {
  // e.g.
  //const accessToken = req.headers.authorization.split(" ")[1]

  settings.getSettings(req.body, (obj) => {
    res.json(obj);
  });
};

const setSettings = (req, res, next) => {
  settings.setSettings(req.body, (message) => res.json(message));
};

const register = (req, res, next) => {
  settings.register(req.body, (message) => res.json(message));
};

const login = (req, res, next) => {
  settings.login(req.body, (message) => res.json(message));
};

module.exports = {
  getSettings,
  setSettings,
  register,
  login,
};
