const nodemailer = require("nodemailer");

// Setup transporter using environment variables
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,   // Your email
    pass: process.env.EMAIL_PASS,   // App password or email password
  },
});

// Send email for Donation submissions
async function sendDonationEmail(data) {
  const emailHTML = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #4CAF50;">New Donation Received</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Amount:</strong> $${data.amount}</p>
      <p><strong>Message:</strong> ${data.message || "N/A"}</p>
      <hr style="border:none; border-top:1px solid #eee;" />
      <p>Thank you for your support!</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Donation System" <${process.env.EMAIL_USER}>`,
    to: process.env.RECEIVER_EMAIL,
    subject: "New Donation Received",
    html: emailHTML,
  });
}

// Send email for Contact form submissions
async function sendContactEmail(data) {
  const emailHTML = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #2196F3;">New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Subject:</strong> ${data.subject || "N/A"}</p>
      <p><strong>Message:</strong> ${data.message}</p>
      <hr style="border:none; border-top:1px solid #eee;" />
      <p>Please follow up promptly!</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Contact System" <${process.env.EMAIL_USER}>`,
    to: process.env.RECEIVER_EMAIL,
    subject: "New Contact Form Submission",
    html: emailHTML,
  });
}

module.exports = {
  sendDonationEmail,
  sendContactEmail,
};
