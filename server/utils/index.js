const { google } = require("googleapis");

const SCOPES = [
  "https://www.googleapis.com/auth/calendar.readonly",
  "https://www.googleapis.com/auth/userinfo.email",
  "profile",
  "https://www.googleapis.com/auth/calendar.events",
];
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "http://localhost:4000/google/callback"
);

module.exports = {
  SCOPES,
  oauth2Client,
  google,
};
