const { connection } = require("../database");
const url = require("url");

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
      obj["google"] = userDb.google;
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
            google: false,
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

const googleCall = (google, client, scopes, cb) => {
  google.options({ auth: client });
  const authorizeUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  cb(authorizeUrl);
};

const googleCallBack = async (reqUrl, client, google, cb) => {
  // Successful authentication, redirect home.
  const qs = new url.URL(reqUrl, "http://localhost:4000").searchParams;
  const { tokens } = await client.getToken(qs.get("code"));
  client.credentials = tokens;
  var email = "";
  const service = google.people({ version: "v1", client });
  await service.people
    .get({ resourceName: "people/me", personFields: "emailAddresses" })
    .then((d) => (email = d.data.emailAddresses[0].value));

  connection((db) => {
    db.collection("users").updateOne(
      { email: email },
      {
        $set: {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          google: true,
        },
      },
      {
        upsert: true,
      },
      (err, docs) => {
        if (err) console.log(err);
        cb("http://localhost:3000/");
      }
    );
  });
};

const googleRemove = async (email, cb) => {
  // console.log(email);
  connection((db) => {
    db.collection("users").updateOne(
      { email: email },
      {
        $set: {
          google: false,
          access_token: "",
          refresh_token: "",
        },
      },
      (err, data) => {
        if (err) cb("Error from DB");
        cb("Success");
      }
    );
  });
};

module.exports = {
  getSettings,
  setSettings,
  register,
  login,
  googleCall,
  googleCallBack,
  googleRemove,
};
