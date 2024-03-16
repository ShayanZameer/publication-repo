// const { google } = require('googleapis');
// const nodemailer = require('nodemailer');
// import { GoogleAuth } from "google-auth-library";
import nodemailer from "nodemailer"

// const OAuth2Client = new google.auth.OAuth2(
//   '462376652771-sckgbud8tdtfdgf2gvdr4gpu7vjb6mgs.apps.googleusercontent.com',
//   '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',
//   'YOUR_REDIRECT_URL' // This can be any URL, e.g., 'http://localhost'
// );

// // Generate an OAuth URL and redirect users to this URL to grant access
// const authUrl = OAuth2Client.generateAuthUrl({
//   access_type: 'offline',
//   scope: 'https://www.googleapis.com/auth/gmail.send',
// });

// console.log(authUrl);
// Once you have the access token, you can set up Nodemailer with OAuth2
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'muneebjutt026@gmail.com',
    clientId: '462376652771-sckgbud8tdtfdgf2gvdr4gpu7vjb6mgs.apps.googleusercontent.com',
    clientSecret: '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',
    refreshToken: 'YOUR_REFRESH_TOKEN', // Obtained after user grants access
  },
});
