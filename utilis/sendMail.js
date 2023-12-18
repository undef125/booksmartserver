const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv")
dotenv.config()

sgMail.setApiKey(process.env.SG_API_KEY);

module.exports = sgMail;