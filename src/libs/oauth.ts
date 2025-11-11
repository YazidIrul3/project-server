import config from "../config/config";

const { google } = require("googleapis");

/**
 * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
 * from the client_secret.json file. To get these credentials for your application, visit
 * https://console.cloud.google.com/apis/credentials.
 */
export const oauth2Client = new google.auth.OAuth2(
  config.GOOGLE_CLIENT_ID,
  config.GOOGLE_CLIENT_SECRET,
  config.REDIRECT_AUTH_URL
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  // "email",
  // "profile",
];

export const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: scopes,
  // redirect_url: config.REDIRECT_AUTH_URL,
  //   include_granted_scopes: true,
  //   state: false,
});

export const oauth2 = google.oauth2({
  auth: oauth2Client,
  version: "v2",
});
