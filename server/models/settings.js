const { connection } = require("../database");

const getSettings = (user = {}, cb) => {
  connection((db) => {
    db.collection("users").findOne({ email: user.email }, (err, userDb) => {
      if (err) console.log(err);
      obj = {};
      obj["mon"] = userDb.mon;
      obj["tue"] = userDb.tue;
      obj["wed"] = userDb.wed;
      obj["thu"] = userDb.thu;
      obj["fri"] = userDb.fri;
      obj["sat"] = userDb.sat;
      obj["sun"] = userDb.sun;
      obj["sess"] = userDb.sess;
      obj["email"] = userDb.email;
      cb(obj);
    });
  });
};

const setSettings = (user = {}, cb) => {
  connection((db) => {
    db.collection("users").updateOne(
      { email: user.email },
      {
        $set: {
          mon: user.mon,
          tue: user.tue,
          wed: user.wed,
          thu: user.thu,
          fri: user.fri,
          sat: user.sat,
          sun: user.sun,
          sess: user.sess,
        },
      },
      {
        upsert: true,
      },
      (err, userDb) => {
        if (err) console.log(err);
        cb({ message: "Success" });
      }
    );
  });
};

const register = (user = {}, cb) => {
  connection((db) => {
    db.collection("users").findOne({ email: user.email }, (err, data) => {
      if (err) console.log(err);
      if (data) cb({ message: "User exists" });
      else {
        db.collection("users").insert(
          {
            email: user.email,
            mon: [0, 0],
            tue: [0, 0],
            wed: [0, 0],
            thu: [0, 0],
            fri: [0, 0],
            sat: [0, 0],
            sun: [0, 0],
            sess: [0],
          },
          (err, userDb) => {
            if (err) console.log(err);
            cb({ message: "Success" });
          }
        );
      }
    });
  });
};

const login = (user = {}, cb) => {
  connection((db) => {
    db.collection("users").findOne({ email: user.email }, (err, data) => {
      if (err) console.log(err);
      if (data) cb({ message: "Success" });
      else cb({ message: "User does not exist" });
    });
  });
};

module.exports = {
  getSettings,
  setSettings,
  register,
  login,
};
