const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// Configure your SMTP settings
const transporter = nodemailer.createTransport({
  service: "Gmail", // or another email service provider
  auth: {
    user: "lethabolesheleba2003@gmail.com", // Your email address
    pass: "Lethabo@2003",
  },
});

// Example function for HTTP requests
exports.exampleFunction = functions.https.onRequest((req, res) => {
  // Your function logic here
  res.send("Hello from Firebase!");
});

// Email sending function
exports.sendEmail = functions.https.onCall(async (data, context) => {
  const {to, subject, text} = data;

  const mailOptions = {
    from: "lethabolesheleba2003@gmail.com", // Your email address
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {success: true};
  } catch (error) {
    console.error("Error sending email: ", error);
    throw new functions.https.HttpsError("internal", "Unable to send email");
  }
});
