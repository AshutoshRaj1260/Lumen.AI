const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail({ to, subject, html, text }) {
  try {
    const data = await resend.emails.send({
      from: 'Lumen AI <contact@lumen-ai.dev>', // MUST be your verified domain
      to: [to],
      subject: subject,
      html: html,
      text: text, 
    });
    console.log("Email sent successfully");
    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
module.exports = sendEmail;