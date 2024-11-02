const nodemailer = require('nodemailer');

const sendEmail = async ({ email, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject,
      text: message,
      html: `<div>${message}</div>`
    });

    return true;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
};

module.exports = sendEmail; 