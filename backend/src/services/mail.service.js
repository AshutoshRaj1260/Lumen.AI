const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

transporter
  .verify()
  .then(() => {
    console.log("Email transporter is ready to send emails");
  })
  .catch((err) => {
    console.log("Email transporter verification failed", err);
  });

async function sendEmail({ to, subject, html, text }) {
  try {
    const mailOptions = {
      from: process.env.GOOGLE_USER,
      to,
      subject,
      text,
      html,
    };

    const details = await transporter.sendMail(mailOptions);
    console.log("Email sent:", details);
    return details;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = sendEmail;
